"use client";

import { useEffect } from "react";
import { useMusic } from "@/providers/music-provider";

export function KeyboardHandler() {
  const { playSomething, isHistoryOpen, isFiltersOpen } = useMusic();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHistoryOpen || isFiltersOpen) return;

      if (e.code === "Space") {
        e.preventDefault();
        playSomething();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playSomething, isHistoryOpen, isFiltersOpen]);

  return null;
}
