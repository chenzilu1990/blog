import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
import { CookieConsent } from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || "我的个人博客",
    template: "%s | " + (process.env.NEXT_PUBLIC_SITE_NAME || "我的个人博客")
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "分享我的技术文章、经验和想法的个人博客",
  keywords: ["博客", "技术", "文章", "经验分享"],
  authors: [{ name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "博客作者" }],
  creator: process.env.NEXT_PUBLIC_AUTHOR_NAME || "博客作者",
  publisher: process.env.NEXT_PUBLIC_AUTHOR_NAME || "博客作者",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "zh_CN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "我的个人博客",
    title: process.env.NEXT_PUBLIC_SITE_NAME || "我的个人博客",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "分享我的技术文章、经验和想法的个人博客",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: process.env.NEXT_PUBLIC_SITE_NAME || "我的个人博客",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_SITE_NAME || "我的个人博客",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "分享我的技术文章、经验和想法的个人博客",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/twitter-image.jpg`],
    creator: process.env.NEXT_PUBLIC_AUTHOR_TWITTER || "@yourusername",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.substring(0, 2) || "zh"}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics />
        <AnalyticsPageView />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
