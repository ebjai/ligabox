export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-dark.png" alt="Liga de Boxeo" className="h-7 w-7 rounded" />
          <span className="text-lg font-semibold tracking-wide text-amber-200">
            LIGA <span className="text-amber-300/90">DE</span> BOXEO
          </span>
        </a>

        <div className="ml-auto hidden w-full max-w-md items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-amber-100/80 focus-within:ring-1 focus-within:ring-amber-300/40 sm:flex">
          <input
            className="w-full bg-transparent outline-none placeholder:text-amber-100/40"
            placeholder="Search fighters, events, analysis…"
          />
          <kbd className="ml-2 rounded bg-white/10 px-2 py-0.5 text-xs text-amber-100/70">⌘K</kbd>
        </div>

        <a
          href="#"
          className="rounded-lg bg-amber-600/90 px-3 py-1.5 text-sm font-medium text-black hover:bg-amber-500"
        >
          Join the League
        </a>
      </div>
    </header>
  );
}

