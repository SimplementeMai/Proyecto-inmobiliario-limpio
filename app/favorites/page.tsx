"use client";

import { useEffect, useState } from "react";
import { FavoritesList } from "@/app/components/FavoritesList";
import { useFavorites } from "@/app/components/FavoriteContext";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/database.types";

type PropertyRow = Database['public']['Tables']['properties']['Row'];

interface Property {
  id: string;
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
}

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favoriteIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from('properties')
        .select('*');

      if (error) {
        console.error('Error fetching favorites:', error.message);
      } else if (data) {
        // Correct typing: data is PropertyRow[]
        const filtered = (data as PropertyRow[]).filter(p => favoriteIds.includes(p.slug) || favoriteIds.includes(p.id));
        console.log('Filtered properties data:', filtered);
        const formatted = filtered.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title || p.address || "Property",
          price: p.price || 0,
          imageUrl: (Array.isArray(p.image_urls) && p.image_urls.length > 0) ? p.image_urls[0] : "/placeholder.jpg"
        }));
        setProperties(formatted);
      }
      setLoading(false);
    }

    fetchFavorites();
  }, [favoriteIds]);

  if (loading) return <main className="container mx-auto px-4 py-12 max-w-2xl">Loading...</main>;

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <FavoritesList properties={properties} />
    </main>
  );
}
