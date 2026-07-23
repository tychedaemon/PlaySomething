"use client";

import { MusicProvider } from "@/providers/music-provider";

export function MusicProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MusicProvider>{children}</MusicProvider>;
}
