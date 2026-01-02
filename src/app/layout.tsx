import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAIVETIME - AI Automation Agency",
  description:
    "AI-powered automation that gives you back your most valuable asset. Save time through intelligent automation solutions.",
  keywords: ["AI automation", "business automation", "time saving", "workflow automation"],
  authors: [
    { name: "Leo Tsantarliotis" },
    { name: "Spilios Spiliopoulos" },
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "SAIVETIME - AI Automation Agency",
    description: "AI-powered automation that gives you back your most valuable asset",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
