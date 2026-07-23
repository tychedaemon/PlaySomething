"use client";

import { useSyncExternalStore } from "react";
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

export function DynamicBackground({ color }: DynamicBackgroundProps) {
  const isClient = useIsClient();

  if (!isClient) return null;

  const baseColor = color || "transparent";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090909]">
      <AnimatePresence mode="wait">
        <motion.div
          key={color || "default"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Full viewport ambient wash */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse 120% 120% at 30% 40%, ${baseColor}, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse 100% 100% at 70% 60%, ${baseColor}, transparent 60%)`,
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(ellipse 140% 140% at 50% 50%, ${baseColor}, transparent 50%)`,
              filter: "hue-rotate(20deg) blur(80px)",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
