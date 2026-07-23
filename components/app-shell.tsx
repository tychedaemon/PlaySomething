"use client";

import { useMusic } from "@/providers/music-provider";
import { LandingPage } from "@/components/landing-page";
import { DiscoveryCard } from "@/components/discovery-card";
import { DynamicBackground } from "@/components/dynamic-background";
import { HistoryDrawer } from "@/components/history-drawer";
import { FiltersDrawer } from "@/components/filters-drawer";
import { Header } from "@/components/header";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorState } from "@/components/error-state";
import { AnimatePresence, motion } from "framer-motion";

export function AppShell() {
  const {
    currentRecommendation,
    isLoading,
    error,
    history,
    filters,
    isHistoryOpen,
    isFiltersOpen,
    playSomething,
    toggleFavorite,
    setFilters,
    toggleHistoryDrawer,
    toggleFiltersDrawer,
    isFavorite,
  } = useMusic();

  if (isLoading && !currentRecommendation) {
    return (
      <>
        <DynamicBackground color={null} />
        <LoadingSpinner />
      </>
    );
  }

  if (error && !currentRecommendation) {
    return (
      <>
        <DynamicBackground color={null} />
        <ErrorState message={error} onRetry={playSomething} />
      </>
    );
  }

  return (
    <>
      <DynamicBackground
        color={currentRecommendation?.dominantColor || null}
      />

      {currentRecommendation && (
        <Header
          onHistoryClick={toggleHistoryDrawer}
          onFiltersClick={toggleFiltersDrawer}
          hasRecommendation={!!currentRecommendation}
        />
      )}

      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8">
        <AnimatePresence mode="wait">
          {currentRecommendation ? (
            <motion.div
              key="discovery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl mx-auto"
            >
              <DiscoveryCard
                item={currentRecommendation}
                isFavorite={isFavorite(currentRecommendation.id)}
                onToggleFavorite={() =>
                  toggleFavorite(currentRecommendation)
                }
                onPlaySomethingElse={playSomething}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={playSomething}
                  disabled={isLoading}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors"
                >
                  {isLoading ? "Discovering..." : "Press Space to discover more"}
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage onPlay={playSomething} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <HistoryDrawer
        isOpen={isHistoryOpen}
        history={history}
        onClose={toggleHistoryDrawer}
        onSelect={() => {
          toggleHistoryDrawer();
        }}
      />

      <FiltersDrawer
        isOpen={isFiltersOpen}
        filters={filters}
        onClose={toggleFiltersDrawer}
        onApply={setFilters}
      />
    </>
  );
}
