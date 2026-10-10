import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { guardRequest, isOriginAllowed, reviewEssay, ReviewError, MAX_BODY_BYTES, DEFAULT_MODEL } from "./lib/essay-review.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

const staticFiles = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/supplemental-questions.js", { file: "supplemental-questions.js", type: "text/javascript; charset=utf-8" }]
]);

function corsHeaders(req) {
  const origin = req.headers.origin;
  if (!origin || !isOriginAllowed(origin, req.headers.host, true)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type, X-Access-Code",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin"
  };
}

function sendJson(req, res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...corsHeaders(req) });
  res.end(status === 204 ? undefined : JSON.stringify(data));
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new ReviewError("Request is too large.", 413);
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw new ReviewError("Request body must be valid JSON.", 400);
  }
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/api/evaluate") {
    if (req.method === "OPTIONS") return sendJson(req, res, 204, {});
    if (req.method !== "POST") return sendJson(req, res, 405, { error: "Use POST." });
    try {
      guardRequest({
        ip: req.socket.remoteAddress,
        origin: req.headers.origin,
        host: req.headers.host,
        accessCode: req.headers["x-access-code"],
        local: true
      });
      return sendJson(req, res, 200, await reviewEssay(await readJson(req)));
    } catch (error) {
      if (error instanceof ReviewError) return sendJson(req, res, error.status, { error: error.message });
      console.error(error);
      return sendJson(req, res, 500, { error: "Evaluation failed." });
    }
  }

  const asset = req.method === "GET" ? staticFiles.get(pathname) : undefined;
  if (asset) {
    try {
      const body = await fs.readFile(path.join(root, asset.file));
      res.writeHead(200, { "Content-Type": asset.type, "Cache-Control": "no-store" });
      return res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(asset.file + " was not found next to local-server.mjs.");
    }
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  const url = "http://localhost:" + port;
  console.log("History trainer v5 is running at " + url);
  console.log("Claude model: " + model + (process.env.ANTHROPIC_API_KEY ? "" : " (ANTHROPIC_API_KEY is not set: AI review is disabled)"));
  if (process.platform === "win32" && !process.env.NO_BROWSER) spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" }).unref();
});
