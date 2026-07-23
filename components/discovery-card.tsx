"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogNumber } from "@/components/catalog-number";
import type { MusicItem, Song } from "@/types/music";

interface DiscoveryViewProps {
  item: MusicItem;
  isFavorite: boolean;
  sessionCount: number;
  onToggleFavorite: () => void;
  onPlaySomethingElse: () => void;
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 200, damping: 24 },
};

export function DiscoveryView({
  item,
  isFavorite,
  sessionCount,
  onToggleFavorite,
  onPlaySomethingElse,
}: DiscoveryViewProps) {
  const isSong = item.type === "song";

  return (
    <div className="h-screen w-screen overflow-hidden" role="region" aria-label="Music recommendation" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full flex flex-col md:flex-row"
        >
          {/* Artwork — left 50% desktop, top 55% mobile */}
          <div className="relative w-full h-[55vh] md:w-1/2 md:h-full flex-shrink-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.8,
              }}
            >
              <Image
                src={item.artwork}
                alt={isSong ? `${item.title} by ${item.artist}` : `${item.title} by ${item.artist}`}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </motion.div>
            {/* Gradient overlay for legibility on mobile bottom edge */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#090909]/90 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#090909]" />
          </div>

          {/* Metadata column — right 50% desktop, below artwork mobile */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-8 md:py-12 overflow-y-auto">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="max-w-lg"
            >
              {/* Catalog number */}
              <motion.div variants={fadeUp} className="mb-6">
                <CatalogNumber count={sessionCount} type={item.type} />
              </motion.div>

              {/* Type eyebrow */}
              <motion.div variants={fadeUp} className="mb-3">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1DB954]">
                  {isSong ? "Song" : "Album"}
                </span>
              </motion.div>

              {/* Title — display face, large and confident */}
              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-3"
              >
                {item.title}
              </motion.h1>

              {/* Artist */}
              <motion.p
                variants={fadeUp}
                className="font-sans text-lg md:text-xl text-white/60 mb-8"
              >
                {item.artist}
              </motion.p>

              {/* Metadata row — mono for data */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-10 font-mono text-xs text-white/30 uppercase tracking-[0.15em]"
              >
                {isSong ? (
                  <>
                    <MetadataItem value={(item as Song).album} />
                    <Dot />
                    <MetadataItem value={(item as Song).genre} />
                    <Dot />
                    <MetadataItem value={item.year.toString()} />
                    <Dot />
                    <MetadataItem value={(item as Song).duration} />
                  </>
                ) : (
                  <>
                    <MetadataItem value={(item as { genres: string[] }).genres.join(", ")} />
                    <Dot />
                    <MetadataItem value={item.year.toString()} />
                    <Dot />
                    <MetadataItem value={`${(item as { trackCount: number }).trackCount} tracks`} />
                  </>
                )}
              </motion.div>

              {/* Action buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-3"
              >
                <a
                  href={item.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md">
                    <ExternalLink className="w-4 h-4" />
                    Listen on Spotify
                  </Button>
                </a>
                <a
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="md">
                    <Play className="w-4 h-4" />
                    Watch on YouTube
                  </Button>
                </a>
              </motion.div>

              {/* Bottom row: favorite + play something else */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5"
              >
                <button
                  onClick={onToggleFavorite}
                  className="group flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <motion.div
                    animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isFavorite
                          ? "fill-[#1DB954] text-[#1DB954]"
                          : "text-white/40 group-hover:text-white/60"
                      }`}
                    />
                  </motion.div>
                  <span className="font-mono text-xs uppercase tracking-wider">
                    {isFavorite ? "Saved" : "Save"}
                  </span>
                </button>

                <span className="text-white/10">·</span>

                <button
                  onClick={onPlaySomethingElse}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Play Something Else
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MetadataItem({ value }: { value: string }) {
  return <span>{value}</span>;
}

function Dot() {
  return <span className="w-[3px] h-[3px] rounded-full bg-white/15 inline-block" />;
}
