"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogNumber } from "@/components/catalog-number";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { MusicItem, Song } from "@/types/music";

interface DiscoveryViewProps {
  item: MusicItem;
  isFavorite: boolean;
  sessionCount: number;
  onToggleFavorite: () => void;
  onPlaySomethingElse: () => void;
}

function metaStagger(reduced: boolean, delay: number) {
  if (reduced) return { opacity: 1, y: 0 };
  return {
    opacity: 0,
    y: 12,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
      delay,
    },
  };
}

function metaAnimate(reduced: boolean, delay: number) {
  if (reduced) return { opacity: 1, y: 0 };
  return {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
      delay,
    },
  };
}

export function DiscoveryView({
  item,
  isFavorite,
  sessionCount,
  onToggleFavorite,
  onPlaySomethingElse,
}: DiscoveryViewProps) {
  const isSong = item.type === "song";
  const reduced = usePrefersReducedMotion();
  const [artworkLoaded, setArtworkLoaded] = useState(false);

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      role="region"
      aria-label="Music recommendation"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.3 }}
          className="h-full w-full flex flex-col md:flex-row max-w-[1920px] mx-auto"
        >
          {/* Artwork — contained card, Apple Music style */}
          <div className="relative w-full h-[45vh] md:h-full md:w-[62%] md:flex-none md:min-w-0 flex items-center justify-center px-5 pt-10 pb-2 md:p-12">
            <motion.div
              layoutId="artwork"
              className="relative aspect-square h-full max-h-[36vh] md:max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
              initial={
                reduced
                  ? { opacity: 0, scale: 0.95 }
                  : { opacity: 0, scale: 0.95, clipPath: "inset(0 100% 0 0)" }
              }
              animate={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)" }
              }
              transition={
                reduced
                  ? { duration: 0.15 }
                  : {
                      clipPath: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      scale: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
            >
              {!artworkLoaded && (
                <div className="absolute inset-0 bg-white/5 animate-pulse" />
              )}
              <Image
                src={item.artwork}
                alt={`${item.title} by ${item.artist}`}
                fill
                className={`object-cover transition-opacity duration-500 ${artworkLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
                onLoad={() => setArtworkLoaded(true)}
              />
            </motion.div>
          </div>

          {/* Metadata column — right 38% desktop, below artwork mobile */}
          <div className="flex-1 min-h-0 md:flex-none md:w-[38%] md:max-w-[640px] md:h-full flex flex-col justify-center items-center px-6 md:px-14 py-5 md:py-16 overflow-y-auto">
            <div className="w-full max-w-[min(90%,560px)]">
            {/* Catalog number */}
            <motion.div
              initial={metaStagger(reduced, 0)}
              animate={metaAnimate(reduced, 0)}
              className="mb-6 md:mb-8"
            >
              <CatalogNumber count={sessionCount} type={item.type} />
            </motion.div>

            {/* Title — Bricolage Grotesque display face */}
            <motion.h1
              initial={metaStagger(reduced, 0.05)}
              animate={metaAnimate(reduced, 0.05)}
              className={`font-display font-bold text-[#F5F5F5] leading-[0.95] tracking-[-0.02em] mb-4 ${
                item.title.length > 18
                  ? "text-[clamp(1.5rem,3.5vw,3rem)]"
                  : "text-[clamp(2rem,5vw,4.5rem)]"
              }`}
            >
              {item.title}
            </motion.h1>

            {/* Artist */}
            <motion.p
              initial={metaStagger(reduced, 0.1)}
              animate={metaAnimate(reduced, 0.1)}
              className="font-sans text-xl text-[#8A8A8A] mb-6 md:mb-8"
            >
              {item.artist}
            </motion.p>

            {/* Metadata row — mono for data */}
            <motion.div
              initial={metaStagger(reduced, 0.15)}
              animate={metaAnimate(reduced, 0.15)}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8 md:mb-12 font-mono text-base text-[#8A8A8A]"
            >
              {isSong ? (
                <>
                  <span>{(item as Song).album}</span>
                  <Dot />
                  <span>{(item as Song).genre}</span>
                  <Dot />
                  <span>{item.year}</span>
                  <Dot />
                  <span>{(item as Song).duration}</span>
                </>
              ) : (
                <>
                  <span>{(item as { genres: string[] }).genres.join(", ")}</span>
                  <Dot />
                  <span>{item.year}</span>
                  <Dot />
                  <span>{(item as { trackCount: number }).trackCount} tracks</span>
                </>
              )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={metaStagger(reduced, 0.2)}
              animate={metaAnimate(reduced, 0.2)}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={item.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="glass" size="lg">
                  <ExternalLink className="w-5 h-5" />
                  Listen on Apple Music
                </Button>
              </a>
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  <Play className="w-5 h-5" />
                  Watch on YouTube
                </Button>
              </a>
            </motion.div>

            {/* Bottom row: favorite + play something else */}
            <motion.div
              initial={metaStagger(reduced, 0.25)}
              animate={metaAnimate(reduced, 0.25)}
              className="flex items-center gap-5 mt-8 md:mt-12"
            >
              <button
                onClick={onToggleFavorite}
                className="group flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
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
                        : "text-[#8A8A8A] group-hover:text-[#F5F5F5]"
                    }`}
                  />
                </motion.div>
                <span className="font-mono text-sm uppercase tracking-wider">
                  {isFavorite ? "Saved" : "Save"}
                </span>
              </button>

              <span className="text-white/10">·</span>

              <button
                onClick={onPlaySomethingElse}
                className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
              >
                <Play className="w-4 h-4" />
                <span className="font-mono text-sm uppercase tracking-wider">
                  Play Something Else
                </span>
              </button>
            </motion.div>
          </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Dot() {
  return (
    <span className="w-[3px] h-[3px] rounded-full bg-[#8A8A8A]/40 inline-block" />
  );
}
