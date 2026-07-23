"use client";

import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onPlay: () => void;
  isLoading: boolean;
}

export function LandingPage({ onPlay, isLoading }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          PlaySomething
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed"
        >
          Don&apos;t know what to listen to?
          <br />
          <span className="text-white/80 font-medium">We&apos;ll pick.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            onClick={onPlay}
            disabled={isLoading}
            size="lg"
            className="group"
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isLoading
                  ? { duration: 1, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 }
              }
            >
              <Dices className="w-6 h-6" />
            </motion.div>
            {isLoading ? "Discovering..." : "Play Something"}
          </Button>
        </motion.div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-6 text-center"
      >
        <p className="text-xs text-white/20">
          Powered by{" "}
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/60 transition-colors"
          >
            Spotify
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
