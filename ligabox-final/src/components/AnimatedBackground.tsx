// ligabox-final/src/components/AnimatedBackground.tsx
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-black to-black" />

      {/* Subtle colored haze */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-red-900/10 to-transparent" />

      {/* Animated “smoke” orbs */}
      <motion.div
        className="absolute top-[-10%] left-1/4 w-[28rem] h-[28rem] bg-amber-500/12 rounded-full blur-3xl"
        initial={{ opacity: 0.35, scale: 1, x: -40, y: 0 }}
        animate={{ opacity: 0.7, scale: 1.1, x: 40, y: 30 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/5 w-[26rem] h-[26rem] bg-red-600/12 rounded-full blur-3xl"
        initial={{ opacity: 0.25, scale: 1, x: 30, y: 0 }}
        animate={{ opacity: 0.6, scale: 1.12, x: -30, y: -30 }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-1/3 w-[32rem] h-[32rem] bg-amber-400/10 rounded-full blur-[90px]"
        initial={{ opacity: 0.2, scale: 1, x: 0, y: 20 }}
        animate={{ opacity: 0.5, scale: 1.05, x: 0, y: -20 }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </div>
  );
}
