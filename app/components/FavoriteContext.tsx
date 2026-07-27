"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./AuthContext";

interface FavoriteContextType {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = React.createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);
  
  React.useEffect(() => {
    async function init() {
      if (authLoading) return;

      if (user) {
        const { data } = await supabase
          .from('favoritos')
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
  }, [user, authLoading]);

  React.useEffect(() => {
    if (isInitialized && !user) {
      localStorage.setItem("favoritePropertyIds", JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, isInitialized, user]);

  const toggleFavorite = async (id: string) => {
    const isCurrentlyFavorite = favoriteIds.includes(id);

    setFavoriteIds((prev) =>
      isCurrentlyFavorite ? prev.filter((fav) => fav !== id) : [...prev, id]
    );

    if (user) {
      let error = null
      if (isCurrentlyFavorite) {
        const result = await supabase
          .from('favoritos')
          .delete()
          .eq('id_user', user.id)
          .eq('id_propiedad', id)
        error = result.error
      } else {
        const result = await supabase
          .from('favoritos')
          .insert({ id_user: user.id, id_propiedad: id })
        error = result.error
      }
      if (error) {
        setFavoriteIds((prev) =>
          isCurrentlyFavorite ? [...prev, id] : prev.filter((fav) => fav !== id)
        )
        console.error('Error updating favorite:', error.message)
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
