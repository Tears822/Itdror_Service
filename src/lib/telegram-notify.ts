/**
 * Send Telegram notifications to admins.
 * Env: TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_IDS (comma-separated chat IDs).
 * On localhost/http Telegram API works; 500s on Vercel are usually from chat file storage (read-only fs), not Telegram.
 */

import { chatLog, chatError } from "@/lib/chat-debug";

function getAdminIds(): string[] {
  const ids = process.env.TELEGRAM_ADMIN_IDS;
  if (!ids || typeof ids !== "string") return [];
  return ids.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function notifyAdminsNewCustomerMessage(
  customerEmail: string,
  sessionId: string,
  messagePreview: string
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminIds = getAdminIds();

  if (!token) {
    chatLog("Telegram", "notifyAdminsNewCustomerMessage skipped: TELEGRAM_BOT_TOKEN not set");
    return;
  }
  if (adminIds.length === 0) {
    chatLog("Telegram", "notifyAdminsNewCustomerMessage skipped: TELEGRAM_ADMIN_IDS empty or not set");
    return;
  }

  chatLog("Telegram", "notifyAdminsNewCustomerMessage sending", {
    customerEmail,
    sessionId,
    adminCount: adminIds.length,
  });

  const text = [
    "🔔 New chat message (customer)",
    `From: ${customerEmail}`,
    `Session: ${sessionId}`,
    "",
    messagePreview.length > 200 ? messagePreview.slice(0, 200) + "…" : messagePreview,
  ].join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await Promise.all(
    adminIds.map(async (chatId) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId.trim(),
            text,
            disable_web_page_preview: true,
          }),
        });
        const body = await res.text();
        if (!res.ok) {
          chatError("Telegram", `sendMessage failed for chat ${chatId}`, {
            status: res.status,
            body: body.slice(0, 300),
          });
          return;
        }
        chatLog("Telegram", "sendMessage ok", { chatId: chatId.trim() });
      } catch (err) {
        chatError("Telegram", "sendMessage fetch error", err);
      }
    })
  );
}

export async function notifyAdminsNewSession(customerEmail: string, sessionId: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminIds = getAdminIds();

  if (!token) {
    chatLog("Telegram", "notifyAdminsNewSession skipped: TELEGRAM_BOT_TOKEN not set");
    return;
  }
  if (adminIds.length === 0) {
    chatLog("Telegram", "notifyAdminsNewSession skipped: TELEGRAM_ADMIN_IDS empty or not set");
    return;
  }

  chatLog("Telegram", "notifyAdminsNewSession sending", {
    customerEmail,
    sessionId,
    adminCount: adminIds.length,
  });

  const text = [
    "🆕 New chat session",
    `Email: ${customerEmail}`,
    `Session: ${sessionId}`,
  ].join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await Promise.all(
    adminIds.map(async (chatId) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId.trim(),
            text,
            disable_web_page_preview: true,
          }),
        });
        const body = await res.text();
        if (!res.ok) {
          chatError("Telegram", `sendMessage (new session) failed for chat ${chatId}`, {
            status: res.status,
            body: body.slice(0, 300),
          });
          return;
        }
        chatLog("Telegram", "notifyAdminsNewSession sendMessage ok", { chatId: chatId.trim() });
      } catch (err) {
        chatError("Telegram", "notifyAdminsNewSession fetch error", err);
      }
    })
  );
}
