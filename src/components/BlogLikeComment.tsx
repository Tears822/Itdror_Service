"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Loader2 } from "lucide-react";

const STORAGE_KEY_PREFIX = "blog-likes-";

type Comment = { author: string; text: string; at: string };

type BlogLikeCommentProps = {
  slug: string;
};

export function BlogLikeComment({ slug }: BlogLikeCommentProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storageKey = `${STORAGE_KEY_PREFIX}${slug}`;

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      if (raw) {
        const data = JSON.parse(raw) as { liked?: boolean; count?: number };
        setLiked(Boolean(data.liked));
        setLikeCount(Number(data.count) || 0);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  useEffect(() => {
    fetch(`/api/blog/${encodeURIComponent(slug)}/comments`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleLike = () => {
    const newLiked = !liked;
    const newCount = Math.max(0, likeCount + (newLiked ? 1 : -1));
    setLiked(newLiked);
    setLikeCount(newCount);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ liked: newLiked, count: newCount }));
    } catch {
      // ignore
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = comment.trim();
    if (!text || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: "Guest", text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post comment");
      setComments((prev) => [...prev, data]);
      setComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Like */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleLike}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            liked
              ? "border-primary bg-primary/10 text-primary"
              : "border-black/10 bg-white hover:bg-slate-50 text-muted hover:text-foreground"
          }`}
          aria-pressed={liked}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          <span>
            {liked ? "Liked" : "Like"}
            {likeCount > 0 && ` · ${likeCount}`}
          </span>
        </button>
      </div>

      {/* Comments */}
      <section aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-accent" />
          Comments
          {comments.length > 0 && (
            <span className="text-sm font-normal text-muted">({comments.length})</span>
          )}
        </h2>

        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
            disabled={submitting}
          />
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          <button
            type="submit"
            disabled={!comment.trim() || submitting}
            className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Post comment
          </button>
        </form>

        {loading ? (
          <p className="text-muted text-sm">Loading comments...</p>
        ) : (
        <ul className="space-y-4">
          {comments.map((c, i) => (
            <li key={i} className="pl-4 border-l-2 border-accent/30 py-1">
              <p className="text-sm font-medium text-foreground">{c.author}</p>
              <p className="text-muted text-sm mt-0.5">{c.text}</p>
              {c.at && (
                <p className="text-xs text-muted mt-1">
                  {new Date(c.at).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </p>
              )}
            </li>
          ))}
        </ul>
        )}
      </section>
    </div>
  );
}
