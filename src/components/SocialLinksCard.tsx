"use client";

import Link from "next/link";
import {
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Star,
  LucideIcon,
} from "lucide-react";

const socialLinks: { href: string; label: string; icon: LucideIcon }[] = [
  {
    href: "https://www.linkedin.com/company/itdorservices",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/channel/UCxs816FBY3ma1bjTFqz2QXg",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://www.instagram.com/itdorservices",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://x.com/itdorservices",
    label: "X",
    icon: Twitter,
  },
  {
    href: "https://g.page/r/CY_Ou-dFLdhWEAI/review",
    label: "Leave a review",
    icon: Star,
  },
];

type SocialLinksCardProps = {
  /** 'row' = horizontal layout (e.g. footer); 'column' = vertical stack */
  layout?: "column" | "row";
};

export function SocialLinksCard({ layout = "column" }: SocialLinksCardProps) {
  return (
    <div className="social-card-wrapper">
      <div className="social-card">
        <ul
          className={`social-card-list ${layout === "row" ? "social-card-list--row" : ""}`}
        >
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <li key={label} className="social-card-item">
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card-link"
                aria-label={label}
              >
                <Icon className="social-card-icon" strokeWidth={1.5} />
              </Link>
              <span className="social-card-text">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
