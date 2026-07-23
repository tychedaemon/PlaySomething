"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { MusicItem, Filters, AppState } from "@/types/music";
import { getMusicProvider } from "@/services/local-data";

type MusicAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_RECOMMENDATION"; payload: MusicItem }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FILTERS"; payload: Filters }
  | { type: "TOGGLE_FAVORITE"; payload: MusicItem }
  | { type: "ADD_TO_HISTORY"; payload: MusicItem }
  | { type: "TOGGLE_HISTORY_DRAWER" }
  | { type: "TOGGLE_FILTERS_DRAWER" }
  | { type: "LOAD_STATE"; payload: Partial<AppState> };

const STORAGE_KEY = "playsomething-state";

const defaultFilters: Filters = { type: "everything" };

const initialState: AppState = {
  currentRecommendation: null,
  isLoading: false,
  error: null,
  history: [],
  favorites: [],
  filters: defaultFilters,
  isHistoryOpen: false,
  isFiltersOpen: false,
};

function musicReducer(state: AppState, action: MusicAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload, error: null };
    case "SET_RECOMMENDATION":
      return {
        ...state,
        currentRecommendation: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.some((f) => f.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((f) => f.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    case "ADD_TO_HISTORY": {
      const filtered = state.history.filter((h) => h.id !== action.payload.id);
      return {
        ...state,
        history: [action.payload, ...filtered].slice(0, 25),
      };
    }
    case "TOGGLE_HISTORY_DRAWER":
      return {
        ...state,
        isHistoryOpen: !state.isHistoryOpen,
        isFiltersOpen: false,
      };
    case "TOGGLE_FILTERS_DRAWER":
      return {
        ...state,
        isFiltersOpen: !state.isFiltersOpen,
        isHistoryOpen: false,
      };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface MusicContextType extends AppState {
  playSomething: () => Promise<void>;
  toggleFavorite: (item: MusicItem) => void;
  setFilters: (filters: Filters) => void;
  toggleHistoryDrawer: () => void;
  toggleFiltersDrawer: () => void;
  isFavorite: (id: string) => boolean;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "LOAD_STATE",
          payload: {
            favorites: parsed.favorites || [],
            history: parsed.history || [],
          },
        });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          favorites: state.favorites,
          history: state.history,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [state.favorites, state.history]);

  const playSomething = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const provider = getMusicProvider();
      const excludeIds = state.history.slice(0, 10).map((h) => h.id);
      const item = await provider.getRandomItem(state.filters, excludeIds);
      dispatch({ type: "SET_RECOMMENDATION", payload: item });
      dispatch({ type: "ADD_TO_HISTORY", payload: item });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }, [state.filters, state.history]);

  const toggleFavorite = useCallback((item: MusicItem) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: item });
  }, []);

  const setFilters = useCallback((filters: Filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  const toggleHistoryDrawer = useCallback(() => {
    dispatch({ type: "TOGGLE_HISTORY_DRAWER" });
  }, []);

  const toggleFiltersDrawer = useCallback(() => {
    dispatch({ type: "TOGGLE_FILTERS_DRAWER" });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.favorites.some((f) => f.id === id),
    [state.favorites]
  );

  return (
    <MusicContext.Provider
      value={{
        ...state,
        playSomething,
        toggleFavorite,
        setFilters,
        toggleHistoryDrawer,
        toggleFiltersDrawer,
        isFavorite,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextType {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
