import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearMessages, getSession } from "@/lib/chat-store";
import { chatLog, chatError, errorPayload } from "@/lib/chat-debug";

const ADMIN_COOKIE = "admin_chat_auth";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    chatLog("ClearMessages", "DELETE /api/chat/sessions/[sessionId]/messages");
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (token !== process.env.ADMIN_CHAT_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    if (!getSession(sessionId)) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    clearMessages(sessionId);
    chatLog("ClearMessages", "DELETE success", { sessionId });
    return NextResponse.json({ ok: true });
  } catch (error) {
    chatError("ClearMessages", "DELETE error", error);
    return NextResponse.json(
      errorPayload(error, "Internal server error"),
      { status: 500 }
    );
  }
}
