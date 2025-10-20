import AnimatedBackground from "../components/AnimatedBackground";
import Brand from "../components/Brand";

export default function Home2035() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-[#f1d6a5]">
      <AnimatedBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Brand size={44} />
        <a
          href="/join"
          className="rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-semibold text-black hover:bg-amber-400"
        >
          Join the League
        </a>
      </header>

      {/* Your content */}
      <main className="relative z-10">
        {/* Existing hero, video grid, etc. */}
      </main>
    </div>
  );
}
