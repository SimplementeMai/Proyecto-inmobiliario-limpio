"use client";

import * as React from "react";

interface FavoriteContextType {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = React.createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("favoritePropertyIds");
    if (saved) {
      try {
        setFavoriteIds(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing favorites", e);
      }
    }
    setIsInitialized(true);
  }, []);

  React.useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favoritePropertyIds", JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, isInitialized]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return (
    <FavoriteContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = React.useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}
