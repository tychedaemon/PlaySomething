"use client";

import { motion } from "framer-motion";
import { History, SlidersHorizontal } from "lucide-react";

interface HeaderProps {
  onHistoryClick: () => void;
  onFiltersClick: () => void;
  hasRecommendation: boolean;
}

export function Header({
  onHistoryClick,
  onFiltersClick,
  hasRecommendation,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
    >
      <div className="mx-auto max-w-screen px-6 py-5 flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {hasRecommendation && (
            <span className="font-mono text-[11px] text-white/25 tracking-[0.2em] uppercase">
              PlaySomething
            </span>
          )}
        </motion.div>

        <div className="flex items-center gap-1">
          <button
            onClick={onFiltersClick}
            className="p-3 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={onHistoryClick}
            className="p-3 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
            aria-label="Open history"
          >
            <History className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
