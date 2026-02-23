"use client";

import Link from "next/link";

type RidgeButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function RidgeButton({ href, children, className = "", onClick }: RidgeButtonProps) {
  const classes = `ridge-btn ${className}`.trim();

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
