/**
 * Chat system debug logging and safe error payloads.
 * Set CHAT_DEBUG=1 or run in development to get detailed logs and error details in API responses.
 */

const DEBUG = process.env.CHAT_DEBUG === "1" || process.env.NODE_ENV === "development";

export function isChatDebug(): boolean {
  return !!DEBUG;
}

export function chatLog(section: string, message: string, data?: unknown): void {
  if (!DEBUG) return;
  const prefix = `[Chat:${section}]`;
  if (data !== undefined) {
    console.log(prefix, message, data);
  } else {
    console.log(prefix, message);
  }
}

export function chatError(section: string, message: string, error: unknown): void {
  console.error(`[Chat:${section}]`, message, error);
  if (error instanceof Error && error.stack) {
    console.error(`[Chat:${section}] stack:`, error.stack);
  }
}

/** Build JSON error body for API responses. errorDetail is always included so the client can show it in console (e.g. 500 on Vercel). */
export function errorPayload(error: unknown, defaultMessage = "Internal server error"): {
  error: string;
  errorDetail?: string;
} {
  const payload: { error: string; errorDetail?: string } = { error: defaultMessage };
  const detail = error instanceof Error ? error.message : error !== undefined ? String(error) : undefined;
  if (detail) payload.errorDetail = detail;
  return payload;
}
