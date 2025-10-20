import Head from "next/head";
import BackgroundFX from "../components/BackgroundFX";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-lbx:bg text-white">
      <Head>
        <title>Liga de Boxeo</title>
        <meta name="description" content="Liga de Boxeo — Official Site" />
      </Head>

      {/* Background */}
      <BackgroundFX />

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        {/* Hero */}
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4">
          <section className="w-full py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                La nueva era del boxeo.
              </h1>
              <p className="mt-5 max-w-xl text-zinc-300">
                Calendarios en vivo, perfiles de peleadores, highlights y rankings
                oficiales. Construido para fans y atletas.
              </p>
              <div className="mt-8 flex gap-3">
                <a
                  href="#events"
                  className="rounded-lg border border-amber-500/60 bg-amber-500/10 px-5 py-2.5 text-amber-300 hover:bg-amber-500/20"
                >
                  Próximos eventos
                </a>
                <a
                  href="#fighters"
                  className="rounded-lg border border-zinc-700 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10"
                >
                  Ver peleadores
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-zinc-800/60 bg-black/40 py-6 text-sm text-zinc-400">
          <div className="mx-auto max-w-7xl px-4">
            © {new Date().getFullYear()} Liga de Boxeo. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}
