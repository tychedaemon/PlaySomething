"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CatalogNumberProps {
  count: number;
  type: "song" | "album";
}

export function CatalogNumber({ count, type }: CatalogNumberProps) {
  const padded = count.toString().padStart(4, "0");
  const label = type === "song" ? "SPIN" : "DROP";

  return (
    <div
      className="flex items-center gap-2 font-mono text-sm tracking-[0.2em]"
      role="status"
      aria-live="polite"
      aria-label={`Discovery number ${count}`}
    >
      <span className="text-white/50">№</span>
      <span className="text-white/40 tabular-nums">
        {padded.split("").map((digit, i) => (
          <OdometerDigit key={`pos-${i}`} value={digit} index={i} />
        ))}
      </span>
      <span className="text-white/20">·</span>
      <span className="text-white/30">{label}</span>
    </div>
  );
}

function OdometerDigit({ value, index }: { value: string; index: number }) {
  return (
    <span className="inline-block relative overflow-hidden h-[1.2em] align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: index * 0.03,
          }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
