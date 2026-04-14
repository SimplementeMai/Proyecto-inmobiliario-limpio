"use client";

import * as React from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "./FavoriteContext";

interface FavoriteProperty {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export function FavoritePropertyCard({ property }: { property: FavoriteProperty }) {
  const { toggleFavorite } = useFavorites();
  const formattedPrice = `$${(property.price / 1000000).toFixed(1)}M`;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(property.id);
  };

  return (
    <Link href={`/property/${property.id}`}>
      <Card className="flex items-center p-4 gap-4 hover:shadow-md transition-shadow cursor-pointer">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-grow">
          <h4 className="font-semibold">{property.title}</h4>
          <p className="text-primary font-bold">{formattedPrice}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleToggle}>
          <Heart className="h-5 w-5 fill-primary text-primary" />
        </Button>
      </Card>
    </Link>
  );
}
