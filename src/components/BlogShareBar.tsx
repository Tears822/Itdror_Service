"use client";

import { useState } from "react";
import { Linkedin, Twitter, Facebook, Link2, Check } from "lucide-react";

const siteUrl = "https://itdorservices.com";

type BlogShareBarProps = {
  url: string;
  title: string;
  description: string;
};

export function BlogShareBar({ url, title, description }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted">Share:</span>
      {shareLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black/10 bg-white hover:bg-slate-50 text-foreground transition-colors"
          aria-label={`Share on ${label}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-black/10 bg-white hover:bg-slate-50 text-foreground text-sm transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
        <span className="sr-only sm:not-sr-only sm:inline">{copied ? "Copied!" : "Copy link"}</span>
      </button>
    </div>
  );
}
