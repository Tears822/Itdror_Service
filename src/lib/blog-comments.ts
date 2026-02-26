/**
 * Blog comments stored in .txt files (one file per post slug).
 * Each line is a JSON object: {"author":"...","text":"...","at":"ISO date"}
 */

import fs from "fs";
import path from "path";

const COMMENTS_DIR = path.join(process.cwd(), "data", "blog-comments");

export type StoredComment = {
  author: string;
  text: string;
  at: string;
};

function getFilePath(slug: string): string {
  const safe = slug.replace(/[^a-z0-9-]/gi, "-");
  return path.join(COMMENTS_DIR, `${safe}.txt`);
}

export function getComments(slug: string): StoredComment[] {
  const filePath = getFilePath(slug);
  if (!fs.existsSync(filePath)) return [];

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.trim().split("\n").filter(Boolean);
    const comments: StoredComment[] = [];
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line) as StoredComment;
        if (parsed.author != null && parsed.text != null && parsed.at != null) {
          comments.push(parsed);
        }
      } catch {
        // skip invalid lines
      }
    }
    return comments;
  } catch {
    return [];
  }
}

export function appendComment(slug: string, author: string, text: string): StoredComment {
  const filePath = getFilePath(slug);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const comment: StoredComment = {
    author: author.trim() || "Guest",
    text: text.trim(),
    at: new Date().toISOString(),
  };
  const line = JSON.stringify(comment) + "\n";
  fs.appendFileSync(filePath, line, "utf-8");
  return comment;
}
