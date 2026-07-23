"use client";

import { createClient } from "@/lib/supabase/client";
import { HeroSearch } from "@/app/components/HeroSearch";
import { CategorySelector } from "@/app/components/CategorySelector";
import { PropertyCard } from "@/app/components/PropertyCard";
import { useFavorites } from "@/app/components/FavoriteContext";
import * as React from "react";

interface Property {
  id: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  imageUrl: string;
  address: string | null;
  slug: string;
  type: 'sale' | 'rent';
}

interface SupabaseProperty {
  id: number;
  slug: string;
  price: number | null;
  location: string | null;
  address: string | null;
  beds: number | null;
  baths: number | null;
  image_urls: string[] | null;
}

export default function HomeDiscover() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [allProperties, setAllProperties] = React.useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = React.useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchProperties() {
      const supabase = createClient();
      const { data, error } = await supabase.from('properties').select<string, Property>('*');

      if (error) {
        console.error('Error fetching properties:', error.message, error.details, error.hint);
        return;
      }

      if (data) {
        const formattedProperties: Property[] = data.map((prop, index: number) => {
          // Simulamos renta si el index es par o el precio es bajo
          const isRent = index % 3 === 0; 
          const p = prop as unknown as SupabaseProperty;
          let simulatedPrice = p.price ?? 0;
          
          if (isRent && simulatedPrice > 10000) {
            simulatedPrice = Math.floor(simulatedPrice / 500); // Convertimos millones a miles para renta
          }

          return {
            id: p.slug, // ID para lógica interna (favoritos)
            slug: p.slug,
            price: simulatedPrice,
            location: p.location ?? "Ubicación no disponible",
            beds: p.beds ?? 0,
            baths: p.baths ?? 0,
            imageUrl: (Array.isArray(p.image_urls) && p.image_urls.length > 0) ? p.image_urls[0] : "/placeholder.jpg",
            address: p.address,
            type: isRent ? 'rent' : 'sale'
          };
        });
        setAllProperties(formattedProperties);
        setFilteredProperties(formattedProperties);
      }
    }
    fetchProperties();
  }, []);

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredProperties(
        allProperties.filter(
          (prop) =>
            prop.location?.toLowerCase().includes(lowerCaseQuery) ||
            prop.address?.toLowerCase().includes(lowerCaseQuery) ||
            prop.id.toLowerCase().includes(lowerCaseQuery)
        )
      );
    } else {
      setFilteredProperties(allProperties);
    }
  }, [allProperties]);

  const handleCategorySelect = React.useCallback((categoryId: string) => {
    if (categoryId === 'all') {
      setFilteredProperties(allProperties);
      return;
    }

    // Mapeo manual para asegurar que los slugs coincidan con las categorías
    const filters: Record<string, string[]> = {
      houses: ['villa', 'home', 'manor', 'cottage', 'estate', 'house'],
      apartments: ['apartment', 'condo', 'loft', 'studio'],
      villas: ['villa', 'estate', 'manor'],
      penthouses: ['penthouse']
    };

    const keywords = filters[categoryId] || [];
    setFilteredProperties(
      allProperties.filter((prop) => 
        keywords.some(keyword => prop.slug.includes(keyword))
      )
    );
  }, [allProperties]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <HeroSearch searchQuery={searchQuery} onSearch={handleSearch} />

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Explora por Categoría</h2>
        <CategorySelector initialActiveId="all" onCategorySelect={handleCategorySelect} />
      </section>

      <section className="my-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              {searchQuery ? `Resultados para "${searchQuery}"` : "Propiedades Destacadas"}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={isFavorite(prop.id)}
                onToggleFavorite={() => toggleFavorite(prop.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              {searchQuery ? "No se encontraron propiedades." : "No hay propiedades en esta categoría."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
