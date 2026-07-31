"use client";

import Link from "next/link";
import { Zap, Code2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-tight">
            Worker PWA D1 Starter
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://developers.cloudflare.com/workers/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition"
            aria-label="Cloudflare Workers Documentation"
          >
            <Code2 className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
