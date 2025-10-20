import React from "react";
import Brand from "../components/Brand";

// --- Optional: tiny placeholder widgets until the real AI widgets are wired ---
function AITicker() {
  return (
    <div className="mx-auto mb-6 w-full max-w-6xl rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300">
      <span className="mr-2 inline-block rounded bg-amber-500/10 px-2 py-0.5 text-amber-400">
        AI
      </span>
      Live ticker: Crawford training camp insights · Inoue P4P ↑ ·
      Williams–Volkov odds shifting…
    </div>
  );
}

export default function Home2035() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-900/70 bg-black/70 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
          <Brand />
          <nav className="hidden items-center gap-6 md:flex">
            <a className="text-sm text-zinc-300 hover:text-amber-400" href="/fighters">Fighters</a>
            <a className="text-sm text-zinc-300 hover:text-amber-400" href="/events">Events</a>
            <a className="text-sm text-zinc-300 hover:text-amber-400" href="/rankings">Rankings</a>
            <a className="text-sm text-zinc-300 hover:text-amber-400" href="/community">Community</a>
          </nav>
          <a
            href="/join"
            className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-amber-400"
          >
            Join the League
          </a>
        </div>
      </header>

      {/* AI Ticker */}
      <main className="mx-auto w-full max-w-7xl px-4">
        <div className="pt-6">
          <AITicker />
        </div>

        {/* Hero: Next Big Fight + Prediction */}
        <section className="relative mt-4 overflow-hidden rounded-2xl border border-zinc-900 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
          {/* subtle “spotlights” */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
          </div>

          <div className="relative grid gap-8 p-6 md:grid-cols-[1.2fr,0.8fr] md:p-10">
            {/* Left: headline */}
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-400">
                Next Big Fight • AI Preview
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Crawford vs. Spence III
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-300">
                The People’s League brings you 2035-grade, AI-assisted analysis:
                momentum, styles, sparring telemetry, public sentiment, and live
                line movement—distilled into score-like probabilities.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="/predictions/crawford-spence-3"
                  className="rounded-md bg-amber-500 px-4 py-2 font-medium text-black hover:bg-amber-400"
                >
                  View Prediction
                </a>
                <a
                  href="/events"
                  className="rounded-md border border-zinc-700 px-4 py-2 font-medium text-zinc-200 hover:border-zinc-500"
                >
                  Get Tickets
                </a>
              </div>
            </div>

            {/* Right: compact odds card */}
            <aside className="rounded-xl border border-zinc-800 bg-black/40 p-5">
              <h3 className="mb-4 text-sm font-semibold text-zinc-300">AI Edge (Live)</h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-400">Crawford</p>
                  <p className="mt-1 text-2xl font-bold text-amber-400">58%</p>
                  <p className="mt-1 text-[11px] text-zinc-400">KO/TKO 22%</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-400">Spence Jr</p>
                  <p className="mt-1 text-2xl font-bold text-zinc-200">42%</p>
                  <p className="mt-1 text-[11px] text-zinc-400">Decision 31%</p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-zinc-500">
                * Prototype preview. Numbers are illustrative until your data
                pipeline is connected.
              </p>
            </aside>
          </div>
        </section>

        {/* Media rail (YouTube-style cards) */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold">LDB.AI Media Feed</h2>
            <a href="/media" className="text-sm text-zinc-400 hover:text-amber-400">View all</a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950"
              >
                <div className="aspect-video w-full bg-gradient-to-tr from-zinc-900 to-zinc-800" />
                <div className="p-4">
                  <p className="mb-1 line-clamp-2 font-medium group-hover:text-amber-400">
                    {i % 2 === 0
                      ? "LDB.AI predicts next major upset"
                      : "Champion “El Toro” retains in 12-round war"}
                  </p>
                  <p className="text-sm text-zinc-400">NEWS • 7 min read</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-900 py-8 text-sm text-zinc-400">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between">
            <Brand withText={false} size={32} />
            <p>© {new Date().getFullYear()} Liga de Boxeo — The People’s League</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
