import React from "react";

// If the logo ever moves, change only this path:
import logo from "../../public/ldblogotransparent.png";

export default function Brand({
  size = 44,
  withText = true,
}: { size?: number; withText?: boolean }) {
  return (
    <a href="/" className="inline-flex items-center gap-3">
      <img
        src={logo}
        alt="Liga de Boxeo"
        width={size}
        height={size}
        className="select-none"
        draggable={false}
      />
      {withText && (
        <span className="text-xl font-semibold tracking-wide text-zinc-100">
          LIGA <span className="text-amber-400">DE</span> BOXEO
        </span>
      )}
    </a>
  );
}
