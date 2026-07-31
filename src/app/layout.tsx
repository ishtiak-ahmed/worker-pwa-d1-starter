import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Worker PWA D1 Starter — Next.js 15 Edge Boilerplate",
  description:
    "Clean starter template with Cloudflare Workers, Next.js 15, Cloudflare D1, Drizzle ORM, Tailwind CSS v4, PWA manifest, and Zustand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020617" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-slate-950`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
