"use client";

import { useMusic } from "@/providers/music-provider";
import { LandingPage } from "@/components/landing-page";
import { DiscoveryView } from "@/components/discovery-card";
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

  const sessionCount = history.length;

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

      <AnimatePresence mode="wait">
        {currentRecommendation ? (
          <motion.div
            key="discovery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DiscoveryView
              item={currentRecommendation}
              isFavorite={isFavorite(currentRecommendation.id)}
              sessionCount={sessionCount}
              onToggleFavorite={() =>
                toggleFavorite(currentRecommendation)
              }
              onPlaySomethingElse={playSomething}
            />
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
