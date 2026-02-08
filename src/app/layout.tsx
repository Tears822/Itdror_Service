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
  title: "IT Dor Services | IT Consulting for Businesses in Boston, MA",
  description: "Professional IT support, network setup, cybersecurity, and cloud solutions serving Boston, MA, New Hampshire & Rhode Island. Get reliable technology services that keep your business running smoothly.",
  keywords: ["IT consulting", "network setup", "cybersecurity", "cloud solutions", "IT support", "Boston MA", "New Hampshire", "Rhode Island"],
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "IT Dor Services | IT Consulting for Businesses in Boston, MA",
    description: "Professional IT support, network setup, cybersecurity, and cloud solutions. Fast response time, affordable rates, no long-term contracts.",
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
