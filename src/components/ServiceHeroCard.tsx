"use client";

import type { LucideIcon } from "lucide-react";

type ServiceHeroCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Link destination; if set, card is an <a> */
  href?: string;
  /** Click handler when no href; card is a button */
  onClick?: () => void;
  /** Optional className on the outer wrapper */
  className?: string;
};

export function ServiceHeroCard({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  className = "",
}: ServiceHeroCardProps) {
  const viewMore = (
    <>
      <span>View more</span>
      <svg
        className="w-[18px] h-[18px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </>
  );

  const content = (
    <>
      <div className="ui-card-3d__glass" aria-hidden />
      <div className="ui-card-3d__content">
        <span className="ui-card-3d__title">{title}</span>
        <span className="ui-card-3d__text">{description}</span>
      </div>
      <div className="ui-card-3d__logo" aria-hidden>
        <span className="ui-card-3d__circle ui-card-3d__circle1" />
        <span className="ui-card-3d__circle ui-card-3d__circle2" />
        <span className="ui-card-3d__circle ui-card-3d__circle3" />
        <span className="ui-card-3d__circle ui-card-3d__circle4" />
        <span className="ui-card-3d__circle ui-card-3d__circle5">
          <Icon className="w-[22px] h-[22px]" strokeWidth={2} />
        </span>
      </div>
      <div className="ui-card-3d__bottom">
        <span className="ui-card-3d__view-more">{viewMore}</span>
      </div>
    </>
  );

  const wrapperClassName = `ui-card-3d ${className}`.trim();

  if (href !== undefined) {
    return (
      <a href={href} className={wrapperClassName}>
        <div className="ui-card-3d__inner">{content}</div>
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
      <div className="ui-card-3d__inner">{content}</div>
    </div>
  );
}
