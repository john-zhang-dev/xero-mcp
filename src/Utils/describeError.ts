/**
 * Render a thrown value as text for a tool response without serialising it.
 *
 * xero-node rejects a failed API call with a plain `{ response, body }`
 * object, not an Error. Interpolating it prints "[object Object]", and
 * JSON.stringify would copy `response.request.headers.authorization`, the
 * caller's bearer token, into the text returned to the model. Only the
 * status code and human-readable message fields are read here.
 */

const MESSAGE_KEYS = new Set(["message", "detail", "title", "error", "error_description"]);
const SKIP_KEYS = /^(request|config|headers|rawHeaders|req|socket|connection|authorization|token|access_token|refresh_token|id_token)$/i;
const MAX_DEPTH = 6;
const MAX_MESSAGES = 10;
const MAX_LENGTH = 500;

export function describeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error.slice(0, MAX_LENGTH);
  if (!error || typeof error !== "object") return String(error);

  const { response, body } = error as {
    response?: { statusCode?: unknown; statusMessage?: unknown; body?: unknown };
    body?: unknown;
  };

  let status = "Xero API error";
  if (typeof response?.statusCode === "number") {
    status = `Xero API ${response.statusCode}`;
    if (typeof response.statusMessage === "string" && response.statusMessage) {
      status += ` ${response.statusMessage}`;
    }
  }

  const messages: string[] = [];
  collectMessages(response?.body, messages, 0);
  if (messages.length === 0) collectMessages(body, messages, 0);
  if (messages.length === 0) return status;
  return `${status}: ${messages.join("; ")}`.slice(0, MAX_LENGTH);
}

function collectMessages(value: unknown, out: string[], depth: number): void {
  if (out.length >= MAX_MESSAGES || depth > MAX_DEPTH) return;
  if (typeof value === "string") {
    if (depth === 0 && value.trim()) out.push(value.trim());
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectMessages(item, out, depth + 1);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (SKIP_KEYS.test(key)) continue;
    if (MESSAGE_KEYS.has(key.toLowerCase()) && typeof child === "string" && child.trim()) {
      if (!out.includes(child.trim())) out.push(child.trim());
    } else {
      collectMessages(child, out, depth + 1);
    }
    if (out.length >= MAX_MESSAGES) return;
  }
}
