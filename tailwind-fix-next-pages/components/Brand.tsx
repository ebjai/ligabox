import React from "react";

export default function Brand({ withText = true, size = 24 }: { withText?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ width: size, height: size }} className="rounded bg-amber-500" />
      {withText && <span className="font-semibold">Liga de Boxeo</span>}
    </div>
  );
}
