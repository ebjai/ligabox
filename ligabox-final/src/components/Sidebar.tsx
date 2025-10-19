const sections = [
  { id: "home", label: "Home" },
  { id: "fighters", label: "Fighters" },
  { id: "events", label: "Events" },
  { id: "rankings", label: "Rankings" },
  { id: "ai", label: "AI Insights" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 border-r border-white/10 bg-black/40 p-3 sm:block">
      <nav className="space-y-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`/${s.id}`}
            className="block rounded-lg px-3 py-2 text-sm text-amber-100/80 hover:bg-white/5 hover:text-amber-100"
          >
            {s.label}
          </a>
        ))}
        <div className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-100/80">
          <div className="mb-1 font-medium text-amber-200">AI Ticker</div>
          <p className="leading-relaxed">
            👁️ Crawford vs. Inoue probability shifted +2.1% on social momentum.
          </p>
        </div>
      </nav>
    </aside>
  );
}

