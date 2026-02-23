"use client";

import type { LucideIcon } from "lucide-react";

/** Three hex (or CSS) colors for the wave gradient: [primary, mid 60%, end] */
export type WaveColors = [string, string, string];

const DEFAULT_WAVE_COLORS: WaveColors = ["#00c8e8", "#2DA0FF", "#0080d0"];

type ServiceWaveCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Gradient colors for the waves; different per service */
  waveColors?: WaveColors;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Use faster wave animation (more visible spin) */
  playing?: boolean;
};

export function ServiceWaveCard({
  title,
  description,
  icon: Icon,
  waveColors = DEFAULT_WAVE_COLORS,
  href,
  onClick,
  className = "",
  playing = true,
}: ServiceWaveCardProps) {
  const [c1, c2, c3] = waveColors;
  const style = {
    "--wave-c1": c1,
    "--wave-c2": c2,
    "--wave-c3": c3,
  } as React.CSSProperties;

  const content = (
    <>
      <div className="wave-card__inner">
        <div className="wave-card__wave" aria-hidden />
        <div className="wave-card__wave" aria-hidden />
        <div className="wave-card__wave" aria-hidden />
      </div>
      <div className="wave-card__content">
        <div className="wave-card__icon-wrap">
          <Icon className="w-9 h-9" strokeWidth={2} />
        </div>
        <span className="wave-card__title">{title}</span>
        <span className="wave-card__text">{description}</span>
        <span className="wave-card__cta">
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
    </>
  );

  const wrapperClassName = [
    "wave-card",
    playing ? "wave-card--playing" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href !== undefined) {
    return (
      <a href={href} className={wrapperClassName} style={style}>
        {content}
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={wrapperClassName}
      style={style}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {content}
    </div>
  );
}
