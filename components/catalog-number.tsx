"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CatalogNumberProps {
  count: number;
  type: "song" | "album";
}

export function CatalogNumber({ count, type }: CatalogNumberProps) {
  const padded = count.toString().padStart(4, "0");
  const label = type === "song" ? "SPIN" : "LP";

  return (
    <div
      className="flex items-center gap-3 font-mono text-base tracking-[0.15em]"
      role="status"
      aria-live="polite"
      aria-label={`Discovery number ${count}`}
    >
      <span className="text-[#F5F5F5] tabular-nums">
        {padded.split("").map((digit, i) => (
          <OdometerDigit key={`pos-${i}`} value={digit} index={i} />
        ))}
      </span>
      <span className="text-[#8A8A8A]">·</span>
      <span className="text-[#8A8A8A]">{label}</span>
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
            damping: 30,
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
