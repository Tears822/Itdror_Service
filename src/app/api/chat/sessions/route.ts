import { NextRequest, NextResponse } from "next/server";
import { getAllSessions, getMessages } from "@/lib/chat-store";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_chat_auth";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (token !== process.env.ADMIN_CHAT_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = getAllSessions();
    const withCount = sessions.map((s) => ({
      ...s,
      messageCount: getMessages(s.id).length,
    }));

    return NextResponse.json({ sessions: withCount });
  } catch (error) {
    console.error("Chat sessions list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
