// ligabox-final/src/components/AnimatedBackground.tsx
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Contrast scrim to protect text/readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gentle tinted haze */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/12 via-red-900/6 to-transparent" />

      {/* Soft “smoke” orbs (very low opacity, heavy blur) */}
      <motion.div
        className="absolute -top-20 left-1/4 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-[120px]"
        initial={{ opacity: 0.25, scale: 1, x: -40, y: 0 }}
        animate={{ opacity: 0.35, scale: 1.06, x: 30, y: 28 }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-[18%] w-[26rem] h-[26rem] bg-red-500/8 rounded-full blur-[130px]"
        initial={{ opacity: 0.2, scale: 1, x: 30, y: 0 }}
        animate={{ opacity: 0.3, scale: 1.08, x: -30, y: -30 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 left-1/3 w-[34rem] h-[34rem] bg-amber-300/8 rounded-full blur-[140px]"
        initial={{ opacity: 0.18, scale: 1, x: 0, y: 20 }}
        animate={{ opacity: 0.28, scale: 1.04, x: 0, y: -20 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </div>
  );
}
