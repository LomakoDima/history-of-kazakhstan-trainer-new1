import { guardRequest, reviewEssay, ReviewError, MAX_BODY_BYTES } from "../lib/essay-review.js";

export const maxDuration = 60;

function reply(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } });
}

export async function POST(request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for") || "";
    guardRequest({
      ip: forwarded.split(",")[0].trim() || request.headers.get("x-real-ip"),
      origin: request.headers.get("origin"),
      host: request.headers.get("host"),
      accessCode: request.headers.get("x-access-code")
    });

    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) throw new ReviewError("Request is too large.", 413);
    let payload;
    try {
      payload = JSON.parse(body || "{}");
    } catch {
      throw new ReviewError("Request body must be valid JSON.", 400);
    }
    return reply(await reviewEssay(payload));
  } catch (error) {
    if (error instanceof ReviewError) return reply({ error: error.message }, error.status);
    console.error(error);
    return reply({ error: "Evaluation failed." }, 500);
  }
}
