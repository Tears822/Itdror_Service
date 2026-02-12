import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components";
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
    default: "IT Dor Services | IT Consulting & Development Worldwide",
    template: "%s | IT Dor Services",
  },
  description:
    "Professional IT support, network setup, cybersecurity, cloud solutions, and software development delivered remotely to clients worldwide. Long-term contracts preferred.",
  keywords: [
    "IT consulting",
    "network setup",
    "cybersecurity",
    "cloud solutions",
    "IT support",
    "remote IT",
    "worldwide",
    "software development",
    "web development",
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
    title: "IT Dor Services | IT Consulting & Development Worldwide",
    description:
      "Professional IT support and development delivered remotely worldwide. Fast response time, affordable rates, long-term contracts preferred.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 400,
        alt: "IT Dor Services - IT Consulting & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Dor Services | IT Consulting & Development Worldwide",
    description:
      "Professional IT support and development delivered remotely worldwide.",
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
        {children}
      </body>
    </html>
  );
}
