"use client";

import { useSyncExternalStore, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicBackgroundProps {
  color: string | null;
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function positions(seed: number) {
  const p = (n: number) => ((seed * 13 + n * 7) % 100);
  return {
    x1: p(0),
    y1: p(1),
    x2: p(2),
    y2: p(3),
  };
}

export function DynamicBackground({ color }: DynamicBackgroundProps) {
  const isClient = useIsClient();

  const pos = useMemo(() => positions(hashSeed(color)), [color]);

  if (!isClient) return null;

  const baseColor = color || "#1DB954";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090909]">
      <AnimatePresence mode="wait">
        <motion.div
          key={color || "default"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Large ambient wash */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 100% 100% at ${pos.x1}% ${pos.y1}%, ${baseColor}, transparent 60%)`,
            }}
          />
          {/* Secondary accent */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse 80% 80% at ${pos.x2}% ${pos.y2}%, ${baseColor}, transparent 50%)`,
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function hashSeed(color: string | null): number {
  if (!color) return 0;
  let h = 0;
  for (let i = 0; i < color.length; i++) {
    h = (h * 31 + color.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}
