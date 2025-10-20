// ligabox-final/src/App.tsx
import AnimatedBackground from "./components/AnimatedBackground";

export default function App() {
  return (
    <div className="relative min-h-screen text-amber-100">
      <AnimatedBackground />

      <header className="container mx-auto px-4 py-6 flex items-center gap-3">
        <img
          src="/ldblogotransparent.png"
          alt="Liga de Boxeo"
          className="h-10 w-auto"
        />
        <span className="sr-only">Liga de Boxeo</span>
      </header>

      <main className="container mx-auto px-4 py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          The People’s League
        </h1>
        <p className="mt-4 max-w-xl text-amber-200/70">
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
      </main>
    </div>
  );
}
