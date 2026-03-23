import * as React from "react"
import { MapPin } from "lucide-react"

interface Property {
  title: string
  price: number
  location: string
}

export function PropertyHeader({ property }: { property: Property }) {
  const formattedPrice = `$${(property.price / 1000000).toFixed(1)}M`

  return (
    <div className="space-y-2 py-6">
      <h1 className="text-4xl font-bold tracking-tight">{property.title}</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-lg">{property.location}</span>
        </div>
        <div className="text-3xl font-black text-primary">
          {formattedPrice}
        </div>
      </div>
    </div>
  )
}
