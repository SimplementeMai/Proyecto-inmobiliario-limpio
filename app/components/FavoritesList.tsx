import * as React from "react"
import { FavoritePropertyCard } from "./FavoritePropertyCard"
import { EmptyState } from "./EmptyState"

interface Property {
  title: string
  price: number
  imageUrl: string
}

export function FavoritesList({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return <EmptyState message="No favorites yet" />
  }

  return (
    <div className="grid gap-4">
      {properties.map((property) => (
        <FavoritePropertyCard key={property.title} property={property} />
      ))}
    </div>
  )
}
