// ligabox-final/src/App.tsx
import AnimatedBackground from "./components/AnimatedBackground";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-amber-100">
      <AnimatedBackground />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex items-center gap-3">
          <img
            src="/ldblogotransparent.png"
            alt="Liga de Boxeo"
            className="h-10 w-auto"
          />
          <span className="sr-only">Liga de Boxeo</span>
        </header>

        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-amber-100">
              The People’s League
            </h1>
            <p className="mt-4 text-lg text-amber-200/80">
              The most advanced, AI-powered boxing platform.
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href="/join"
                className="inline-flex items-center rounded-lg bg-amber-500/90 hover:bg-amber-400 text-black font-semibold px-5 py-3"
              >
                Join the League
              </a>
              <a
                href="/fighters"
                className="inline-flex items-center rounded-lg ring-1 ring-amber-500/40 hover:ring-amber-400/60 px-5 py-3"
              >
                Explore Fighters
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
