"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ExternalLink, Play, Music, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MusicItem, Song } from "@/types/music";

interface DiscoveryCardProps {
  item: MusicItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPlaySomethingElse: () => void;
}

function formatDuration(item: MusicItem): string {
  if (item.type === "song") {
    return (item as Song).duration;
  }
  return `${(item as { trackCount: number }).trackCount} tracks`;
}

export function DiscoveryCard({
  item,
  isFavorite,
  onToggleFavorite,
  onPlaySomethingElse,
}: DiscoveryCardProps) {
  const isSong = item.type === "song";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="relative bg-[#151515]/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={item.artwork}
                alt={isSong ? `${item.title} by ${item.artist}` : `${item.title} by ${item.artist}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
                priority
              />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  {isSong ? (
                    <Music className="w-4 h-4 text-[#1DB954]" />
                  ) : (
                    <Disc className="w-4 h-4 text-[#1DB954]" />
                  )}
                  <span className="text-xs font-medium text-[#1DB954] uppercase tracking-wider">
                    {isSong ? "Song" : "Album"}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                  {item.title}
                </h2>
                <p className="text-lg text-white/70 mb-2">{item.artist}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-white/50 mb-4"
              >
                {isSong ? (
                  <>
                    <span>{(item as Song).album}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{(item as Song).genre}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{item.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{formatDuration(item)}</span>
                  </>
                ) : (
                  <>
                    <span>{(item as { genres: string[] }).genres.join(", ")}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{item.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{formatDuration(item)}</span>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-3"
              >
                <a
                  href={item.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="sm">
                    <ExternalLink className="w-4 h-4" />
                    Spotify
                  </Button>
                </a>
                <a
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="sm">
                    <Play className="w-4 h-4" />
                    YouTube
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleFavorite}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <motion.div
                    animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isFavorite
                          ? "fill-[#1DB954] text-[#1DB954]"
                          : "text-white/60"
                      }`}
                    />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-6 pt-6 border-t border-white/5"
          >
            <Button
              onClick={onPlaySomethingElse}
              className="w-full"
              variant="secondary"
            >
              <Play className="w-4 h-4" />
              Play Something Else
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
