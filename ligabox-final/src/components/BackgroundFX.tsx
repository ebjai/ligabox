import React from "react";

/**
 * Full-viewport layered background:
 * - Base black
 * - Soft vertical gradient for depth
 * - Radial accents (top + center) using named classes (safe for purge)
 * - Optional noise overlay to prevent banding
 */
export default function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-black to-black" />

      {/* radial glow top */}
      <div className="absolute inset-0 bg-lbx-radial-top" />

      {/* radial center accent */}
      <div className="absolute inset-0 bg-lbx-radial-center" />

      {/* optional extra accent using arbitrary value (kept literal so Tailwind picks it up) */}
      <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_80%_20%,rgba(251,191,36,0.10),transparent_70%)]" />

      {/* grain */}
      <div className="lbx-noise absolute inset-0" />
    </div>
  );
}
