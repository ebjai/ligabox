import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const videos = [
  { id: "1", title: "LDB.AI predicts next major upset: Tanaka vs. Jones", tag: "AI", views: "225K views" },
  { id: "2", title: "Champion 'El Toro' retains in grueling 12-round war (Analysis)", tag: "News", views: "178K views" },
  { id: "3", title: "Featherweight Phenomenon: Sofia Morales — Profile", tag: "Fighter", views: "96K views" },
  { id: "4", title: "The European Invasion: O'Brien & Rossi set for London", tag: "Preview", views: "132K views" },
  { id: "5", title: "Inside the camp: Davis vs. Benavidez prep week", tag: "Training", views: "89K views" },
  { id: "6", title: "P4P Shuffle Explained — Why Crawford edges Inoue", tag: "AI", views: "241K views" },
];

export default function Home2035() {
  return (
    <div className="min-h-dvh bg-black text-amber-100">
      <NavBar />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 pt-4">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-2xl border border-amber-300/15 bg-gradient-to-br from-amber-300/10 via-white/5 to-transparent p-6">
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-wide text-amber-200/70">Featured</p>
              <h1 className="mt-1 text-2xl font-extrabold text-amber-100 sm:text-3xl">
                The People’s League — AI-powered boxing begins here
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-amber-100/75">
                Predict fights, explore rankings, and watch the sport through intelligent analysis.
                Your hub for modern boxing.
              </p>

              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-400"
                >
                  Watch Highlights
                </a>
                <a
                  href="#"
                  className="rounded-lg border border-amber-300/30 px-3 py-1.5 text-sm text-amber-100/90 hover:bg-white/5"
                >
                  Try LDB.AI
                </a>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-30">
              <img className="h-full w-full object-cover" src="/ring-smoke.jpg" alt="" />
            </div>
          </section>

          {/* Trending Video Grid */}
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-amber-100">Trending Today</h2>
              <a href="#" className="text-xs text-amber-300 hover:underline">
                View all →
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <VideoCard key={v.id} v={v} />
              ))}
            </div>
          </section>

          {/* AI Insights (Static for now) */}
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-amber-100">Live AI Insights</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-100/80">
              <li>Upset alert index updated (↑ 2.1%) — late money moving on the underdog.</li>
              <li>Power-punch exchange rate favors Davis in rounds 8–10 (model v0.9).</li>
              <li>Southpaw vs orthodox trendline leans 56/44 over last 12 months.</li>
            </ul>
          </section>
        </main>
      </div>

      <footer className="mx-auto mt-10 max-w-7xl px-4 py-8 text-xs text-amber-100/50">
        © {new Date().getFullYear()} Liga de Boxeo — The People’s League
      </footer>
    </div>
  );
}
