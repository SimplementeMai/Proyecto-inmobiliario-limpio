"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

interface FavoriteContextType {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = React.createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUserId(user.id)
        const { data } = await supabase
          .from('Favoritos')
          .select('id_propiedad')
          .eq('id_user', user.id)

        if (data) {
          setFavoriteIds(data.map(f => f.id_propiedad))
        }
      } else {
        const saved = localStorage.getItem("favoritePropertyIds");
        if (saved) {
          try {
            setFavoriteIds(JSON.parse(saved));
          } catch (e) {
            console.error("Error parsing favorites", e);
          }
        }
      }
      setIsInitialized(true);
    }
    init();
  }, []);

  React.useEffect(() => {
    if (isInitialized && !userId) {
      localStorage.setItem("favoritePropertyIds", JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, isInitialized, userId]);

  const toggleFavorite = async (id: string) => {
    const isCurrentlyFavorite = favoriteIds.includes(id);

    setFavoriteIds((prev) =>
      isCurrentlyFavorite ? prev.filter((fav) => fav !== id) : [...prev, id]
    );

    if (userId) {
      const supabase = createClient()
      if (isCurrentlyFavorite) {
        await supabase
          .from('Favoritos')
          .delete()
          .eq('id_user', userId)
          .eq('id_propiedad', id)
      } else {
        await supabase
          .from('Favoritos')
          .insert({ id_user: userId, id_propiedad: id })
      }
    }
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
