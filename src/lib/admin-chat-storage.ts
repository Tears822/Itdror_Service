const ADMIN_LAST_READ_KEY = "itdor_admin_last_read";

function getStorage(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ADMIN_LAST_READ_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function getAdminLastRead(sessionId: string): number {
  const map = getStorage();
  return Math.max(0, map[sessionId] ?? 0);
}

export function setAdminLastRead(sessionId: string, messageCount: number): void {
  try {
    const map = getStorage();
    map[sessionId] = Math.max(0, messageCount);
    sessionStorage.setItem(ADMIN_LAST_READ_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}
