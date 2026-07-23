"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2 } from "lucide-react";
import Image from "next/image";
import type { MusicItem } from "@/types/music";

interface HistoryDrawerProps {
  isOpen: boolean;
  history: MusicItem[];
  onClose: () => void;
  onSelect: (item: MusicItem) => void;
}

export function HistoryDrawer({
  isOpen,
  history,
  onClose,
  onSelect,
}: HistoryDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111111] border-l border-white/10 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#1DB954]" />
                  <h2 className="text-lg font-semibold text-white">
                    Recently Played
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  aria-label="Close history"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-white/40">
                    <Trash2 className="w-12 h-12 mb-4" />
                    <p className="text-lg">No history yet</p>
                    <p className="text-sm">Start discovering music!</p>
                  </div>
                ) : (
                  history.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onSelect(item)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.artwork}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-[#1DB954] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-white/50 truncate">
                          {item.artist}
                        </p>
                      </div>
                      <span className="text-xs text-white/30 capitalize">
                        {item.type}
                      </span>
                    </motion.button>
                  ))
                )}
              </div>

              {history.length > 0 && (
                <div className="p-4 border-t border-white/10">
                  <p className="text-xs text-white/30 text-center">
                    {history.length} of 25 entries
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
