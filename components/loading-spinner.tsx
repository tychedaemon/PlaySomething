"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-[#1DB954]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border-[1.5px] border-transparent border-b-white/20"
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-mono text-white/40 tracking-[0.15em] uppercase">
            Discovering
          </p>
          <motion.p
            className="text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase mt-1"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Searching the catalog
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
