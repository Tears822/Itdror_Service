import { NextRequest, NextResponse } from "next/server";
import {
  createOrGetSession,
  getMessages,
} from "@/lib/chat-store";
import { triggerNewSession } from "@/lib/pusher-server";
import { notifyAdminsNewSession } from "@/lib/telegram-notify";
import { chatLog, chatError, errorPayload } from "@/lib/chat-debug";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    chatLog("Session", "POST /api/chat/session called");
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      chatLog("Session", "Validation failed: email required");
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email.trim())) {
      chatLog("Session", "Validation failed: invalid email format");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const session = createOrGetSession(email);
    const isNew = session.createdAt >= Date.now() - 2000; // just created
    if (isNew) {
      chatLog("Session", "New session created, triggering Pusher + Telegram", { sessionId: session.id });
      triggerNewSession({
        id: session.id,
        email: session.email,
        createdAt: session.createdAt,
      });
      try {
        await notifyAdminsNewSession(session.email, session.id);
      } catch (err) {
        chatError("Session", "Telegram notify error", err);
      }
    }

    const messages = getMessages(session.id);
    chatLog("Session", "POST /api/chat/session success", { sessionId: session.id, messageCount: messages.length });

    return NextResponse.json({
      sessionId: session.id,
      email: session.email,
      messages: messages.map((m) => ({
        id: m.id,
        sender: m.sender,
        content: m.content,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    chatError("Session", "POST /api/chat/session error", error);
    return NextResponse.json(
      errorPayload(error, "Internal server error"),
      { status: 500 }
    );
  }
}
