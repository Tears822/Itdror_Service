/**
 * Send Telegram notifications to admins.
 * Env: TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_IDS (comma-separated chat IDs).
 */

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
  if (!token || adminIds.length === 0) return;

  const text = [
    "🔔 New chat message (customer)",
    `From: ${customerEmail}`,
    `Session: ${sessionId}`,
    "",
    messagePreview.length > 200 ? messagePreview.slice(0, 200) + "…" : messagePreview,
  ].join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await Promise.all(
    adminIds.map((chatId) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId.trim(),
          text,
          disable_web_page_preview: true,
        }),
      }).catch((err) => console.error("Telegram send error:", err))
    )
  );
}

export async function notifyAdminsNewSession(customerEmail: string, sessionId: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminIds = getAdminIds();
  if (!token || adminIds.length === 0) return;

  const text = [
    "🆕 New chat session",
    `Email: ${customerEmail}`,
    `Session: ${sessionId}`,
  ].join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await Promise.all(
    adminIds.map((chatId) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId.trim(),
          text,
          disable_web_page_preview: true,
        }),
      }).catch((err) => console.error("Telegram send error:", err))
    )
  );
}
