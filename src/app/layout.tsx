import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd, LenisProvider, ScrollToTop, ChatProviderWithWidget } from "@/components";
import { QuoteIntentProvider } from "@/contexts/QuoteIntentContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
  ],
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
        url: "/assets/logo.png",
        width: 1200,
        height: 400,
        alt: "IT Dor Services - Software Development & Application Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Dor Services | Software Development & Application Support",
    description:
      "Software development and application support in one team. Remote delivery worldwide.",
    images: ["/assets/logo.png"],
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <JsonLd />
        <ScrollToTop />
        <ChatProviderWithWidget>
          <LenisProvider>
          <QuoteIntentProvider>{children}</QuoteIntentProvider>
        </LenisProvider>
        </ChatProviderWithWidget>
      </body>
    </html>
  );
}
