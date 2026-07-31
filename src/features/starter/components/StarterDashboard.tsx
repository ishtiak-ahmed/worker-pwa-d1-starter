"use client";

import { useState, useEffect, useCallback } from "react";
import { useStarterStore } from "../store/useStarterStore";
import type { StarterItem } from "../types";
import {
  Zap,
  Database,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  PlusCircle,
  MinusCircle,
  FolderTree,
  Smartphone,
  Loader2,
  RefreshCw,
  AlertCircle,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Rocket,
  Globe,
} from "lucide-react";

interface StarterDashboardProps {
  initialItems?: StarterItem[];
}

const STEPS = [
  {
    step: "1",
    label: "Clone",
    icon: <Terminal className="w-3.5 h-3.5" />,
    cmd: "git clone https://github.com/ishtiak-ahmed/worker-pwa-d1-starter.git\ncd worker-pwa-d1-starter",
  },
  {
    step: "2",
    label: "Install",
    icon: <Database className="w-3.5 h-3.5" />,
    cmd: "npm install",
  },
  {
    step: "3",
    label: "Configure env",
    icon: <Zap className="w-3.5 h-3.5" />,
    cmd: "cp .dev.vars.example .dev.vars\ncp .env.local.example .env.local",
  },
  {
    step: "4",
    label: "Generate types",
    icon: <Zap className="w-3.5 h-3.5" />,
    cmd: "npm run cf-typegen",
  },
  {
    step: "5",
    label: "Setup local D1",
    icon: <Database className="w-3.5 h-3.5" />,
    cmd: "npm run db:generate\nnpm run db:migrate:local\nnpm run db:seed:local",
  },
  {
    step: "6",
    label: "Run dev server",
    icon: <Terminal className="w-3.5 h-3.5" />,
    cmd: "npm run dev",
  },
  {
    step: "7",
    label: "Migrate remote D1",
    icon: <Globe className="w-3.5 h-3.5" />,
    cmd: "npm run db:migrate:remote\nnpm run db:seed:remote",
  },
  {
    step: "8",
    label: "Deploy",
    icon: <Rocket className="w-3.5 h-3.5" />,
    cmd: "npm run deploy",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy to clipboard"}
      className="p-1.5 rounded-md text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition cursor-pointer shrink-0"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

function GettingStartedSteps() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800">
      {STEPS.map(({ step, label, cmd }) => (
        <div key={step} className="bg-slate-900/60 px-4 py-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                {step}
              </span>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{label}</span>
            </div>
            <CopyButton text={cmd} />
          </div>
          <pre className="text-[11px] font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">{cmd}</pre>
        </div>
      ))}
    </div>
  );
}

export function StarterDashboard({ initialItems }: StarterDashboardProps) {
  const {
    appName,
    counter,
    items,
    isLoading,
    error,
    incrementCounter,
    decrementCounter,
    setInitialItems,
    fetchItems,
    addItem,
    toggleItem,
    removeItem,
  } = useStarterStore();

  const [newItemTitle, setNewItemTitle] = useState("");

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setInitialItems(initialItems);
    } else {
      fetchItems();
    }
  }, [fetchItems, initialItems, setInitialItems]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    const title = newItemTitle.trim();
    setNewItemTitle("");
    await addItem(title);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {/* Header / Hero */}
      <header className="relative overflow-hidden border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Zap className="w-3.5 h-3.5" /> Edge Ready Starter
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                worker-pwa-d1-starter
              </h1>
              <p className="mt-3 text-lg text-slate-400 max-w-2xl">
                Next.js 16 · Cloudflare Workers · D1 + Drizzle ORM · Tailwind CSS v4 · PWA · Zustand
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://developers.cloudflare.com/workers/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition"
              >
                Docs
              </a>
              <div className="px-4 py-2.5 rounded-xl bg-emerald-600 text-slate-950 font-semibold text-sm">
                Feature: starter
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 w-full flex-1 space-y-10">
        {/* Architecture Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Cloudflare Worker</h3>
            <p className="text-sm text-slate-400 mt-1">
              Deploys to Cloudflare Workers edge runtime via `@opennextjs/cloudflare`.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">D1 + Drizzle ORM</h3>
            <p className="text-sm text-slate-400 mt-1">
              Edge SQLite database binding with type-safe Drizzle migrations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <FolderTree className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Feature Architecture</h3>
            <p className="text-sm text-slate-400 mt-1">
              Encapsulated feature-based modular folder structure (`src/features/`).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">PWA Ready</h3>
            <p className="text-sm text-slate-400 mt-1">
              Web App Manifest included for instant mobile installation.
            </p>
          </div>
        </section>

        {/* Getting Started Quick Reference */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Getting Started</h2>
                <p className="text-xs text-slate-500">From clone to deployed in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://developers.cloudflare.com/workers/wrangler/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition"
              >
                <ExternalLink className="w-3 h-3" />
                Wrangler Docs
              </a>
              <a
                href="https://github.com/your-org/worker-pwa-d1-starter#readme"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-medium text-emerald-300 transition"
              >
                <ExternalLink className="w-3 h-3" />
                Full README
              </a>
            </div>
          </div>
          <GettingStartedSteps />
        </section>

        {/* Interactive Zustand Store & D1 Database Demo */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Counter Demo */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Zustand Counter</h2>
              <p className="text-sm text-slate-400 mt-1">
                Test state reactivity inside `starter-feature`.
              </p>
            </div>

            <div className="my-8 text-center">
              <span className="text-6xl font-black text-emerald-400">
                {counter}
              </span>
              <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-mono">
                Current Value
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={decrementCounter}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MinusCircle className="w-4 h-4" /> Decrement
              </button>
              <button
                onClick={incrementCounter}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Increment
              </button>
            </div>
          </div>

          {/* Interactive D1 Database Checklist Demo */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  D1 Database Items
                  <button
                    onClick={() => fetchItems()}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition"
                    title="Refresh from D1 DB (/api/items)"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  </button>
                </h2>
                <p className="text-sm text-slate-400">
                  Fetched directly from Cloudflare D1 via API Route (<code className="text-emerald-400 font-mono">GET /api/items</code>).
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                {items.filter((i) => i.completed).length} / {items.length} Done
              </span>
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-semibold text-amber-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Database Migration Required
                </div>
                <p className="text-slate-300">{error}</p>
                {error.includes("does not exist") && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>npm run db:migrate:remote &nbsp;&bull;&nbsp; npm run db:seed:remote</span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Add a new item to D1 DB..."
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {isLoading && items.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-slate-500 text-sm gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  Loading items from D1 API (/api/items)...
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${item.completed
                            ? "line-through text-slate-500"
                            : "text-slate-200"
                          }`}
                      >
                        {item.title}
                      </span>
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}

              {!isLoading && items.length === 0 && !error && (
                <p className="text-center py-8 text-sm text-slate-500 italic">
                  No items in D1 database. Add one above!
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Cloudflare Workers + Next.js 16 Starter &bull; Tailwind CSS v4 &bull; D1 &bull; Drizzle ORM
      </footer>
    </div>
  );
}
