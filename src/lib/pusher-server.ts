import Pusher from "pusher";

function getPusher(): Pusher | null {
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2";
  const appId = process.env.PUSHER_APP_ID;

  if (!key || !secret || !appId) return null;

  return new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });
}

export function triggerChatMessage(sessionId: string, message: {
  id: string;
  sender: string;
  content: string;
  createdAt: number;
}) {
  const pusher = getPusher();
  if (!pusher) return;

  pusher.trigger(`chat-${sessionId}`, "new-message", message).catch((err) => {
    console.error("Pusher trigger error:", err);
  });
}

export function triggerNewSession(session: { id: string; email: string; createdAt: number }) {
  const pusher = getPusher();
  if (!pusher) return;

  pusher.trigger("admin-sessions", "new-session", session).catch((err) => {
    console.error("Pusher trigger error:", err);
  });
}
