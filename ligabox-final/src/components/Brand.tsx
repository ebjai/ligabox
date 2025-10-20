// src/components/Brand.tsx
export default function Brand({
  size = 36,
  className = "",
}: { size?: number; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logo from /public */}
      <img
        src="/ldblogotransparent.png"
        width={size}
        height={size}
        alt="Liga de Boxeo"
        className="block"
        style={{ filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }}
      />
      <span className="text-[22px] md:text-[24px] font-extrabold tracking-wide text-[#f1d6a5]">
        LIGA DE BOXEO
      </span>
    </div>
  );
}
