"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type ServiceBookCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Image shown on the outer lid (cover) */
  coverImage?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function ServiceBookCard({
  title,
  description,
  icon: Icon,
  coverImage,
  href,
  onClick,
  className = "",
}: ServiceBookCardProps) {
  const content = (
    <>
      <div className="book-card__book">
        <div className="book-card__page">
          <Icon className="book-card__icon" strokeWidth={2} aria-hidden />
          <span className="book-card__title">{title}</span>
          <span className="book-card__text">{description}</span>
          <span className="book-card__cta">
            View more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
        <div className="book-card__cover" aria-hidden>
          {coverImage ? (
            <div className="book-card__cover-image">
              <Image
                src={coverImage}
                alt=""
                fill
                sizes="220px"
                className="book-card__cover-img"
              />
              <span className="book-card__cover-overlay" aria-hidden />
            </div>
          ) : (
            <Icon className="book-card__cover-icon" strokeWidth={2} />
          )}
          <span className="book-card__cover-title">{title}</span>
          <span className="book-card__cover-hint">Hover to open</span>
        </div>
      </div>
    </>
  );

  const wrapperClassName = `book-card ${className}`.trim();

  if (href !== undefined) {
    return (
      <a href={href} className={wrapperClassName}>
        {content}
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={wrapperClassName}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {content}
    </div>
  );
}
