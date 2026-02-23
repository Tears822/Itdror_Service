"use client";

import type { LucideIcon } from "lucide-react";

type BloomButtonProps = {
  href?: string;
  icon: LucideIcon;
  label?: string;
  value?: string;
  /** When true, only the circle (bloom button) is shown; no label below */
  circleOnly?: boolean;
  /** "horizontal" = circle left, contact info right (one row, work together) */
  layout?: "vertical" | "horizontal";
  className?: string;
  "aria-label"?: string;
};

export function BloomButton({
  href,
  icon: Icon,
  label = "",
  value = "",
  circleOnly = false,
  layout = "horizontal",
  className = "",
  "aria-label": ariaLabel,
}: BloomButtonProps) {
  const content = (
    <>
      <div className="bloom-btn__container bloom-btn__container--shrink">
        <div className="bloom-btn__main">
          <div className="bloom-btn__inner">
            <div className="bloom-btn__inner-back" aria-hidden />
            <div className="bloom-btn__inner-front">
              <span className="bloom-btn__icon">
                <Icon className="w-5 h-5 stroke-[1.5]" stroke="currentColor" fill="none" />
              </span>
            </div>
          </div>
          <div className="bloom-btn__glass" aria-hidden />
        </div>
      </div>
      {!circleOnly && (label || value) && (
        <div className={layout === "horizontal" ? "bloom-btn__label bloom-btn__label--horizontal" : "bloom-btn__label"}>
          {label && <span className="bloom-btn__label-title">{label}</span>}
          {value && <span className="bloom-btn__label-value">{value}</span>}
        </div>
      )}
    </>
  );

  const layoutClass = layout === "horizontal" ? "bloom-btn--row" : "";
  const baseClass = `bloom-btn inline-flex ${layout === "horizontal" ? "flex-row items-center gap-5" : "flex-col items-center"} ${layoutClass} ${className}`.trim();
  const classes = href ? baseClass : `${baseClass} bloom-btn--static`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        aria-label={ariaLabel ?? (circleOnly ? [label, value].filter(Boolean).join(": ") || undefined : undefined)}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={classes} role="presentation" aria-label={circleOnly ? ariaLabel : undefined}>
      {content}
    </span>
  );
}
