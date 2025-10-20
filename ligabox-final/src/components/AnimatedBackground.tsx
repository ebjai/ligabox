import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark, moody base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-black" />

      {/* Subtle radial lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-red-900/10 to-transparent" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, -40, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 50, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
