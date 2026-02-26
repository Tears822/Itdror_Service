import { NextRequest, NextResponse } from "next/server";
import { getMessages, addMessage, getSession } from "@/lib/chat-store";
import { triggerChatMessage } from "@/lib/pusher-server";
import { notifyAdminsNewCustomerMessage } from "@/lib/telegram-notify";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }
    if (!getSession(sessionId)) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const messages = getMessages(sessionId);
    return NextResponse.json({
      messages: messages.map((m) => ({
        id: m.id,
        sender: m.sender,
        content: m.content,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error("Chat messages GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, sender, content } = body;

    if (!sessionId || !sender || content === undefined) {
      return NextResponse.json(
        { error: "sessionId, sender, and content are required" },
        { status: 400 }
      );
    }
    if (sender !== "customer" && sender !== "admin") {
      return NextResponse.json(
        { error: "sender must be 'customer' or 'admin'" },
        { status: 400 }
      );
    }
    if (!getSession(sessionId)) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const msg = addMessage(sessionId, sender, String(content));
    if (!msg) {
      return NextResponse.json(
        { error: "Failed to add message" },
        { status: 500 }
      );
    }

    triggerChatMessage(sessionId, {
      id: msg.id,
      sender: msg.sender,
      content: msg.content,
      createdAt: msg.createdAt,
    });

    if (sender === "customer") {
      const session = getSession(sessionId);
      if (session) {
        notifyAdminsNewCustomerMessage(
          session.email,
          sessionId,
          msg.content
        ).catch((err) => console.error("Telegram notify error:", err));
      }
    }

    return NextResponse.json({
      id: msg.id,
      sender: msg.sender,
      content: msg.content,
      createdAt: msg.createdAt,
    });
  } catch (error) {
    console.error("Chat messages POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
