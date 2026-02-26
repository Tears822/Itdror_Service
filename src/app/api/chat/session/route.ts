import { NextRequest, NextResponse } from "next/server";
import {
  createOrGetSession,
  getMessages,
} from "@/lib/chat-store";
import { triggerNewSession } from "@/lib/pusher-server";
import { notifyAdminsNewSession } from "@/lib/telegram-notify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const session = createOrGetSession(email);
    const isNew = session.createdAt >= Date.now() - 2000; // just created
    if (isNew) {
      triggerNewSession({
        id: session.id,
        email: session.email,
        createdAt: session.createdAt,
      });
      notifyAdminsNewSession(session.email, session.id).catch((err) =>
        console.error("Telegram notify error:", err)
      );
    }

    const messages = getMessages(session.id);

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
    console.error("Chat session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
