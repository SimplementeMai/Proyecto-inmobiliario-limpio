"use client"

import * as React from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { AspectRatio } from "@/app/components/ui/aspect-ratio"
import { Bed, Bath, Heart } from "lucide-react" // Import Heart icon
import { Badge } from "@/app/components/ui/badge"
import Link from "next/link"

interface Property {
  id: string
  slug: string
  title?: string
  price: number
  location: string
  beds: number
  baths: number
  imageUrl: string
  type?: 'sale' | 'rent'
}

interface PropertyCardProps {
  property: Property
  isFavorite?: boolean // Prop to indicate if the property is a favorite
  onToggleFavorite?: (propertyId: string) => void // Function to toggle favorite status
}

export function PropertyCard({ property, isFavorite = false, onToggleFavorite }: PropertyCardProps) {
  const isRent = property.type === 'rent'
  const formattedPrice = isRent 
    ? `$${property.price.toLocaleString()}/mes` 
    : `$${(property.price / 1000000).toFixed(1)}M`

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the favorite icon
    e.stopPropagation() // Stop propagation to avoid parent clicks
    if (onToggleFavorite) {
      onToggleFavorite(property.id)
    }
  }

  return (
    // Added a relative div to position the heart icon absolutely
    <div className="relative group"> 
      <Link href={`/property/${property.slug}`} passHref>
        <Card className="overflow-hidden rounded-xl border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="relative">
            <AspectRatio ratio={4 / 3}>
              <img
                src={property.imageUrl}
                alt={property.location}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </AspectRatio>
            <div className="absolute top-4 left-4">
              <Badge className={isRent ? "bg-blue-600 hover:bg-blue-700" : "bg-primary hover:bg-primary/90"}>
                {isRent ? 'Renta' : 'Venta'}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4 space-y-1">
            {property.title && <div className="text-base font-bold truncate">{property.title}</div>}
            <div className="text-lg font-bold text-primary">{formattedPrice}</div>
            <div className="text-sm text-muted-foreground truncate">{property.location}</div>
            <div className="flex gap-4 text-sm font-semibold text-foreground pt-2">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.beds} Hab.</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.baths} Baños</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      {/* Favorite Icon */}
      <div 
        className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md cursor-pointer group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleFavoriteClick}
      >
        <Heart 
          className={`h-6 w-6 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-foreground/70 hover:stroke-red-500'}`}
        />
      </div>
    </div>
  )
}
