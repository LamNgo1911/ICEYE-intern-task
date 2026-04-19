import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "ICEYE On-Call Handovers",
  description: "Submit and view on-call handover notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <span className="font-semibold tracking-wide text-foreground">
                ICEYE <span className="text-primary">OPS</span>
              </span>
            </Link>
            <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
              Handover System
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
