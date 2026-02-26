import { NextRequest, NextResponse } from "next/server";
import { getAllSessions, getMessages } from "@/lib/chat-store";
import { cookies } from "next/headers";
import { chatLog, chatError, errorPayload } from "@/lib/chat-debug";

const ADMIN_COOKIE = "admin_chat_auth";

export async function GET(request: NextRequest) {
  try {
    chatLog("SessionsList", "GET /api/chat/sessions");
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (token !== process.env.ADMIN_CHAT_PASSWORD) {
      chatLog("SessionsList", "GET unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = getAllSessions();
    const withCount = sessions.map((s) => ({
      ...s,
      messageCount: getMessages(s.id).length,
    }));
    chatLog("SessionsList", "GET success", { count: sessions.length });

    return NextResponse.json({ sessions: withCount });
  } catch (error) {
    chatError("SessionsList", "GET /api/chat/sessions error", error);
    return NextResponse.json(
      errorPayload(error, "Internal server error"),
      { status: 500 }
    );
  }
}
