import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ESSAY = Array.from({ length: 40 }, (_, i) => "word" + i).join(" ");

// A stand-in for the Anthropic Messages API that records the last request.
let fake;
let fakeUrl;
let lastRequest;
let fakeReply;

function goodReview() {
  return {
    human_or_ai: { score: 7, label: "Likely human", explanation: "Natural errors." },
    fact_check: { score: 12, explanation: "No errors found." },
    relevance: { score: 8, explanation: "On topic." },
    depth: { score: 5, explanation: "Needs dates." },
    overall_feedback: "Good start.",
    suggested_improvements: ["a", "b", "c", "d", "e"]
  };
}

before(async () => {
  fake = http.createServer((req, res) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      lastRequest = { url: req.url, headers: req.headers, body: JSON.parse(body) };
      const payload = fakeReply ? fakeReply() : {
        id: "msg_test", type: "message", role: "assistant", model: "claude-opus-5-5",
        content: [{ type: "text", text: JSON.stringify(goodReview()) }],
        stop_reason: "end_turn", stop_sequence: null,
        usage: { input_tokens: 10, output_tokens: 10 }
      };
      res.writeHead(payload.status || 200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(payload.body || payload));
    });
  });
  await new Promise(resolve => fake.listen(0, "127.0.0.1", resolve));
  fakeUrl = "http://127.0.0.1:" + fake.address().port;
  process.env.ANTHROPIC_BASE_URL = fakeUrl;
  process.env.ANTHROPIC_API_KEY = "test-key";
});

after(() => new Promise(resolve => fake.close(resolve)));

const lib = await import("../lib/essay-review.js");

beforeEach(() => {
  lastRequest = undefined;
  fakeReply = undefined;
  delete process.env.ACCESS_CODE;
  delete process.env.ANTHROPIC_MODEL;
  lib.__resetGuardsForTests();
});

test("rejects essays shorter than 30 words", async () => {
  await assert.rejects(lib.reviewEssay({ essay: "too short" }), { status: 400 });
});

test("sends a structured Claude request and normalizes the answer", async () => {
  const review = await lib.reviewEssay({
    essay: ESSAY, topic: "Botai", unit: "Unit 1",
    integrity: { keystrokes: 400, pasteAttempts: -3, tabSwitches: "2", evil: "ignored" }
  });
  assert.equal(lastRequest.url, "/v1/messages");
  assert.equal(lastRequest.headers["x-api-key"], "test-key");
  assert.equal(lastRequest.body.model, "claude-opus-5-5");
  assert.equal(lastRequest.body.output_config.format.type, "json_schema");
  assert.equal(lastRequest.body.output_config.effort, "low");
  assert.equal(lastRequest.body.thinking, undefined);
  assert.match(lastRequest.body.messages[0].content, /<student_essay>/);
  assert.match(lastRequest.body.messages[0].content, /"pasteAttempts":0/);
  assert.match(lastRequest.body.messages[0].content, /"tabSwitches":2/);
  assert.doesNotMatch(lastRequest.body.messages[0].content, /evil/);
  assert.equal(review.fact_check.score, 10, "scores are clamped to 0-10");
  assert.equal(review.suggested_improvements.length, 4, "improvements are capped at 4");
});

test("model and effort can be configured", async () => {
  process.env.ANTHROPIC_MODEL = "claude-haiku-5-5";
  process.env.ANTHROPIC_EFFORT = "";
  try {
    await lib.reviewEssay({ essay: ESSAY });
  } finally {
    delete process.env.ANTHROPIC_EFFORT;
  }
  assert.equal(lastRequest.body.model, "claude-haiku-5-5");
  assert.equal(lastRequest.body.output_config.effort, undefined);
});

test("maps refusals, truncation and bad JSON to clear errors", async () => {
  const message = (stop_reason, text) => () => ({
    id: "m", type: "message", role: "assistant", model: "x", stop_reason, stop_sequence: null,
    content: text === null ? [] : [{ type: "text", text }], usage: { input_tokens: 1, output_tokens: 1 }
  });
  fakeReply = message("refusal", "");
  await assert.rejects(lib.reviewEssay({ essay: ESSAY }), /declined/);
  fakeReply = message("max_tokens", "{");
  await assert.rejects(lib.reviewEssay({ essay: ESSAY }), /cut off/);
  fakeReply = message("end_turn", "not json");
  await assert.rejects(lib.reviewEssay({ essay: ESSAY }), /unreadable/);
});

test("maps Anthropic API errors to ReviewError", async () => {
  fakeReply = () => ({ status: 401, body: { type: "error", error: { type: "authentication_error", message: "bad key" } } });
  await assert.rejects(lib.reviewEssay({ essay: ESSAY }), /API key was rejected/);
});

test("rate limit blocks the sixth request in a window", () => {
  const request = { ip: "1.2.3.4", host: "app.example", origin: "https://app.example" };
  for (let i = 0; i < 5; i++) lib.guardRequest(request);
  assert.throws(() => lib.guardRequest(request), { status: 429 });
  lib.guardRequest({ ...request, ip: "5.6.7.8" });
});

test("origin and access code checks", () => {
  const base = { ip: "9.9.9.9", host: "app.example" };
  assert.throws(() => lib.guardRequest({ ...base, origin: "https://evil.example" }), { status: 403 });
  lib.guardRequest({ ...base, origin: "https://app.example" });
  lib.guardRequest({ ...base, origin: undefined });
  assert.throws(() => lib.guardRequest({ ...base, origin: "http://localhost:3000" }), { status: 403 });
  lib.guardRequest({ ...base, origin: "http://localhost:3000", local: true });
  lib.guardRequest({ ...base, origin: "null", local: true });

  process.env.ACCESS_CODE = "secret";
  assert.throws(() => lib.guardRequest({ ...base, origin: undefined }), { status: 401 });
  assert.throws(() => lib.guardRequest({ ...base, origin: undefined, accessCode: "nope" }), { status: 401 });
  lib.guardRequest({ ...base, origin: undefined, accessCode: "secret" });
});

test("Vercel handler returns the review and rejects foreign origins", async () => {
  const { POST } = await import("../api/evaluate.js");
  const make = (headers, body) => new Request("https://app.example/api/evaluate", {
    method: "POST", headers: { "content-type": "application/json", host: "app.example", ...headers },
    body: JSON.stringify(body)
  });
  const ok = await POST(make({ origin: "https://app.example", "x-forwarded-for": "10.0.0.1" }, { essay: ESSAY, topic: "t" }));
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).human_or_ai.label, "Likely human");

  const blocked = await POST(make({ origin: "https://evil.example" }, { essay: ESSAY }));
  assert.equal(blocked.status, 403);

  const tooShort = await POST(make({ "x-forwarded-for": "10.0.0.2" }, { essay: "short" }));
  assert.equal(tooShort.status, 400);
});

test("local server serves the app and the review endpoint", async () => {
  const port = 20000 + Math.floor(Math.random() * 20000);
  const child = spawn(process.execPath, ["server.mjs"], {
    cwd: root,
    env: { ...process.env, PORT: String(port), NO_BROWSER: "1", ANTHROPIC_BASE_URL: fakeUrl, ANTHROPIC_API_KEY: "test-key" },
    stdio: ["ignore", "pipe", "inherit"]
  });
  try {
    await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.stdout.on("data", chunk => { if (String(chunk).includes("running")) resolve(); });
    });
    const base = "http://127.0.0.1:" + port;
    const page = await fetch(base + "/");
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Oral Exam Trainer/);
    const supplements = await fetch(base + "/supplemental-questions.js");
    assert.equal(supplements.status, 200);
    assert.equal((await fetch(base + "/server.mjs")).status, 404, "source files are not served");

    const review = await fetch(base + "/api/evaluate", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "null" },
      body: JSON.stringify({ essay: ESSAY, topic: "t" })
    });
    assert.equal(review.status, 200);
    assert.equal(review.headers.get("access-control-allow-origin"), "null");

    const foreign = await fetch(base + "/api/evaluate", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://evil.example" },
      body: JSON.stringify({ essay: ESSAY })
    });
    assert.equal(foreign.status, 403);
    assert.equal(foreign.headers.get("access-control-allow-origin"), null);
  } finally {
    child.kill();
  }
});
