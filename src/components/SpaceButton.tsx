"use client";

import Link from "next/link";

type SpaceButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function SpaceButton({ href, children, className = "" }: SpaceButtonProps) {
  const classes = `space-btn ${className}`.trim();
  return (
    <Link href={href} className={classes}>
      <span className="space-btn__label">{children}</span>
      <div className="space-btn__stars" aria-hidden>
        <div className="space-btn__stars-inner" />
      </div>
      <div className="space-btn__glow" aria-hidden>
        <span className="space-btn__glow-circle" />
        <span className="space-btn__glow-circle" />
      </div>
    </Link>
  );
}
