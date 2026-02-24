import type { Metadata } from "next";

export const SITE_URL = "https://itdorservices.com";
export const SITE_NAME = "IT Dor Services";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.png`;
export const DEFAULT_DESCRIPTION =
  "Custom software development and application support in one team. We build your applications and support them after launch—troubleshooting, user training, and clear client–dev communication. Remote delivery worldwide.";

const defaultOpenGraph = {
  type: "website" as const,
  locale: "en_US",
  siteName: SITE_NAME,
  images: [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} - Software Development & Application Support`,
    },
  ],
};

const defaultTwitter = {
  card: "summary_large_image" as const,
  site: "@itdorservices",
};

/**
 * Build page metadata with canonical URL, Open Graph, and Twitter.
 * Use for every public page.
 */
export function buildPageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  openGraph,
  twitter,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  openGraph?: Partial<Metadata["openGraph"]>;
  twitter?: Partial<Metadata["twitter"]>;
}): Metadata {
  const url = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;
  const fullTitle = path ? `${title} | ${SITE_NAME}` : title;

  return {
    title: path ? title : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      ...defaultOpenGraph,
      title: fullTitle,
      description,
      url,
      images: openGraph?.images ?? defaultOpenGraph.images,
      ...openGraph,
    },
    twitter: {
      ...defaultTwitter,
      title: fullTitle,
      description,
      ...twitter,
    },
  };
}
