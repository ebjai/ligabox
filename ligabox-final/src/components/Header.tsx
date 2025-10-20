import Brand from "../components/Brand";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Brand size={32} />
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#f1d6a5]/80">
          <a href="#" className="hover:text-[#f1d6a5]">Home</a>
          <a href="#" className="hover:text-[#f1d6a5]">Fighters</a>
          <a href="#" className="hover:text-[#f1d6a5]">Events</a>
          <a href="#" className="hover:text-[#f1d6a5]">Rankings</a>
          <a href="#" className="hover:text-[#f1d6a5]">Community</a>
        </nav>
      </div>
    </header>
  );
}
