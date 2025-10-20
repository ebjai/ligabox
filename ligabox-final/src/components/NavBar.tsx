import Link from "next/link";

export default function Navbar() {
  return (
    <header className="relative z-20 border-b border-zinc-800/60 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-wide text-zinc-100">
          Liga de Boxeo
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="#news" className="text-zinc-300 hover:text-white">Noticias</Link>
          <Link href="#fighters" className="text-zinc-300 hover:text-white">Peleadores</Link>
          <Link href="#events" className="text-zinc-300 hover:text-white">Eventos</Link>
          <Link href="#join" className="rounded-md bg-white/10 px-3 py-1.5 text-white hover:bg-white/15">
            Unirse
          </Link>
        </nav>
      </div>
    </header>
  );
}
