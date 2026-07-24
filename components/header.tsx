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
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
    >
      <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-black/50 to-transparent" />
      <div className="relative mx-auto max-w-screen px-6 py-5 flex items-center justify-between pointer-events-auto">
        <div>
          {hasRecommendation && (
            <span className="font-mono text-[11px] text-[#8A8A8A] tracking-[0.15em] uppercase">
              PlaySomething
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onFiltersClick}
            className="p-3 rounded-xl text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-white/5 transition-all"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={onHistoryClick}
            className="p-3 rounded-xl text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-white/5 transition-all"
            aria-label="Open history"
          >
            <History className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
