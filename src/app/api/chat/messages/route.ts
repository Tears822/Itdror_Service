import { NextRequest, NextResponse } from "next/server";
import { getMessages, addMessage, getSession } from "@/lib/chat-store";
import { triggerChatMessage } from "@/lib/pusher-server";
import { notifyAdminsNewCustomerMessage } from "@/lib/telegram-notify";
import { chatLog, chatError, errorPayload } from "@/lib/chat-debug";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    chatLog("Messages", "GET /api/chat/messages", { sessionId });
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }
    if (!getSession(sessionId)) {
      chatLog("Messages", "GET session not found", { sessionId });
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const messages = getMessages(sessionId);
    chatLog("Messages", "GET success", { sessionId, count: messages.length });
    return NextResponse.json({
      messages: messages.map((m) => ({
        id: m.id,
        sender: m.sender,
        content: m.content,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    chatError("Messages", "GET /api/chat/messages error", error);
    return NextResponse.json(
      errorPayload(error, "Internal server error"),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, sender, content } = body;
    chatLog("Messages", "POST /api/chat/messages", { sessionId, sender, contentLength: String(content).length });

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
      chatLog("Messages", "POST session not found", { sessionId });
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
    chatLog("Messages", "Message added", { msgId: msg.id, sender: msg.sender });

    triggerChatMessage(sessionId, {
      id: msg.id,
      sender: msg.sender,
      content: msg.content,
      createdAt: msg.createdAt,
    });

    if (sender === "customer") {
      const session = getSession(sessionId);
      if (session) {
        try {
          await notifyAdminsNewCustomerMessage(
            session.email,
            sessionId,
            msg.content
          );
        } catch (err) {
          chatError("Messages", "Telegram notify error", err);
        }
      }
    }

    chatLog("Messages", "POST /api/chat/messages success", { msgId: msg.id });
    return NextResponse.json({
      id: msg.id,
      sender: msg.sender,
      content: msg.content,
      createdAt: msg.createdAt,
    });
  } catch (error) {
    chatError("Messages", "POST /api/chat/messages error", error);
    return NextResponse.json(
      errorPayload(error, "Internal server error"),
      { status: 500 }
    );
  }
}
