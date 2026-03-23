import * as React from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { AspectRatio } from "@/app/components/ui/aspect-ratio"
import { Bed, Bath } from "lucide-react"

interface Property {
  price: number
  location: string
  beds: number
  baths: number
  imageUrl: string
}

export function PropertyCard({ property }: { property: Property }) {
  const formattedPrice = `$${(property.price / 1000000).toFixed(1)}M`

  return (
    <Card className="overflow-hidden rounded-xl border-none shadow-sm hover:shadow-md transition-shadow">
      <AspectRatio ratio={4 / 3}>
        <img
          src={property.imageUrl}
          alt={property.location}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <CardContent className="p-4 space-y-2">
        <div className="text-xl font-bold">{formattedPrice}</div>
        <div className="text-sm text-muted-foreground truncate">{property.location}</div>
        <div className="flex gap-4 text-sm font-semibold text-foreground pt-2">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.baths} Baths</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
