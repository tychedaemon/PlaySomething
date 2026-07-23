"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, Music, Disc, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Filters, RecommendationType } from "@/types/music";

interface FiltersDrawerProps {
  isOpen: boolean;
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

const genres = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Indie Pop",
  "Synthpop",
  "Disco Pop",
  "Electropop",
  "Reggaeton",
];

const decades = ["2010s", "2020s"];

const typeOptions: { value: RecommendationType; label: string; icon: React.ReactNode }[] = [
  { value: "everything", label: "Everything", icon: <Globe className="w-4 h-4" /> },
  { value: "songs", label: "Songs Only", icon: <Music className="w-4 h-4" /> },
  { value: "albums", label: "Albums Only", icon: <Disc className="w-4 h-4" /> },
];

export function FiltersDrawer({
  isOpen,
  filters,
  onClose,
  onApply,
}: FiltersDrawerProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

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
                  <SlidersHorizontal className="w-5 h-5 text-[#1DB954]" />
                  <h2 className="text-lg font-semibold text-white">Filters</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
                    Type
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {typeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setLocalFilters({ ...localFilters, type: option.value })
                        }
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                          localFilters.type === option.value
                            ? "bg-[#1DB954] text-black"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
                    Genre
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() =>
                          setLocalFilters({
                            ...localFilters,
                            genre: localFilters.genre === genre ? undefined : genre,
                          })
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          localFilters.genre === genre
                            ? "bg-[#1DB954] text-black"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
                    Decade
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {decades.map((decade) => (
                      <button
                        key={decade}
                        onClick={() =>
                          setLocalFilters({
                            ...localFilters,
                            decade: localFilters.decade === decade ? undefined : decade,
                          })
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          localFilters.decade === decade
                            ? "bg-[#1DB954] text-black"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {decade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 space-y-3">
                <Button onClick={handleApply} className="w-full">
                  Apply Filters
                </Button>
                <Button
                  onClick={() => {
                    setLocalFilters({ type: "everything" });
                  }}
                  variant="ghost"
                  className="w-full"
                >
                  Reset
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
