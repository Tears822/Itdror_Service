import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd, LenisProvider, ScrollToTop, ChatProviderWithWidget, CookieConsent } from "@/components";
import { QuoteIntentProvider } from "@/contexts/QuoteIntentContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://itdorservices.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IT Dor Services | Software Development & Application Support",
    template: "%s | IT Dor Services",
  },
  description:
    "Custom software development and application support in one team. We build your applications and support them after launch—troubleshooting, user training, and clear client–dev communication. Remote delivery worldwide.",
  keywords: [
    "application support",
    "software development",
    "web development",
    "application support specialist",
    "IT support",
    "remote development",
    "Boston IT services",
    "custom software",
    "SaaS development",
    "application support after launch",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, email: true },
  authors: [{ name: "IT Dor Services", url: siteUrl }],
  creator: "IT Dor Services",
  publisher: "IT Dor Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "IT Dor Services",
    title: "IT Dor Services | Software Development & Application Support",
    description:
      "Software development and application support in one team. Build and support your applications with 1 month free support after launch.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "IT Dor Services - Software Development & Application Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Dor Services | Software Development & Application Support",
    description:
      "Software development and application support in one team. Remote delivery worldwide.",
    images: ["/assets/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} font-sans antialiased text-foreground min-h-screen`}
      >
        {/* Smooth page background – same effect across all pages */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#f8fafc] via-background to-[#f8fafc]" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(20,184,166,0.05),transparent_55%)] pointer-events-none" aria-hidden />
        <JsonLd />
        <ScrollToTop />
        <ChatProviderWithWidget>
          <LenisProvider>
          <QuoteIntentProvider>{children}</QuoteIntentProvider>
        </LenisProvider>
        </ChatProviderWithWidget>
        <CookieConsent />
      </body>
    </html>
  );
}
