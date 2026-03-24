import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Patrick_Hand_SC } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand_SC({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamForge Academy — Newsletter",
  description:
    "Subscribe to the DreamForge Academy newsletter. Weekly insights on AI, automation, and building with modern tools for small business owners and tech enthusiasts.",
  openGraph: {
    title: "DreamForge Academy — Newsletter",
    description:
      "Weekly insights on AI, automation, and building with modern tools.",
    url: "https://dreamforge-academy.vercel.app/",
    siteName: "DreamForge Academy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${patrickHand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
