import { NextRequest, NextResponse } from "next/server";
import { getComments, appendComment } from "@/lib/blog-comments";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const comments = getComments(slug);
  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  let body: { author?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
  }

  const author = typeof body.author === "string" ? body.author.trim() : "Guest";
  const comment = appendComment(slug, author, text);
  return NextResponse.json(comment, { status: 201 });
}
