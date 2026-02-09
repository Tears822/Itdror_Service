import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IT Dor Services | IT Consulting & Development Worldwide",
  description: "Professional IT support, network setup, cybersecurity, cloud solutions, and software development delivered remotely to clients worldwide. Long-term contracts preferred.",
  keywords: ["IT consulting", "network setup", "cybersecurity", "cloud solutions", "IT support", "remote IT", "worldwide", "software development", "web development"],
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
  openGraph: {
    title: "IT Dor Services | IT Consulting & Development Worldwide",
    description: "Professional IT support and development delivered remotely worldwide. Fast response time, affordable rates, long-term contracts preferred.",
    type: "website",
    locale: "en_US",
  },
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
        {children}
      </body>
    </html>
  );
}
