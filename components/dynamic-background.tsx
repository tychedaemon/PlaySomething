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

  const baseColor = color || "#1a1a2e";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090909]">
      <AnimatePresence mode="wait">
        <motion.div
          key={color || "default"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30"
            style={{ backgroundColor: baseColor }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
            style={{
              backgroundColor: baseColor,
              filter: "hue-rotate(30deg)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10"
            style={{
              backgroundColor: baseColor,
              filter: "hue-rotate(-30deg)",
            }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#090909]/80" />
    </div>
  );
}
