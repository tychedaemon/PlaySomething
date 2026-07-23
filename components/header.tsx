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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-30"
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {hasRecommendation && (
              <span className="text-sm font-medium text-white/40 tracking-wider uppercase">
                PlaySomething
              </span>
            )}
          </motion.div>

          <div className="flex items-center gap-2">
            <button
              onClick={onFiltersClick}
              className="p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={onHistoryClick}
              className="p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Open history"
            >
              <History className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
