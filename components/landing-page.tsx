"use client";

import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface LandingPageProps {
  onPlay: () => void;
  isLoading: boolean;
}

export function LandingPage({ onPlay, isLoading }: LandingPageProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: reduced ? 0.15 : 0.6 }}
          className="font-display text-5xl md:text-8xl font-bold text-white mb-6 tracking-[-0.02em] leading-[0.9]"
        >
          PlaySomething
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: reduced ? 0.15 : 0.6 }}
          className="text-xl md:text-2xl text-[#8A8A8A] mb-12 leading-relaxed"
        >
          Don&apos;t know what to listen to?
          <br />
          <span className="text-[#F5F5F5]">We&apos;ll pick.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: reduced ? 0.15 : 0.6 }}
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
                  : { type: "spring", stiffness: 200, damping: 15 }
              }
            >
              <Dices className="w-6 h-6" />
            </motion.div>
            {isLoading ? "Discovering..." : "Play Something"}
          </Button>
        </motion.div>
      </motion.div>


    </div>
  );
}
