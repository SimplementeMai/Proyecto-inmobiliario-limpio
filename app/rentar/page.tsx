"use client"

import * as React from "react"
import { PropertyCard } from "@/app/components/PropertyCard"
import { createClient } from "@/lib/supabase/client"

interface Property {
  id: string
  slug: string
  title: string
  price: number
  address: string | null
  image_urls: string[] | null
  beds: number | null
  baths: number | null
  sqft: number | null
}

export default function RentarPage() {
  const [properties, setProperties] = React.useState<Property[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetch() {
      const supabase = createClient()
      const { data } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      setProperties(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando propiedades en renta...</main>

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Propiedades en Renta</h1>
      <p className="text-muted-foreground mb-8">Arrenda el hogar perfecto</p>
      {properties.length === 0 ? (
        <p className="text-muted-foreground">No hay propiedades en renta disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={{
                id: property.id,
                slug: property.slug,
                title: property.title,
                price: property.price,
                location: property.address || "Sin ubicación",
                imageUrl: (Array.isArray(property.image_urls) && property.image_urls.length > 0)
                  ? property.image_urls[0] : "/placeholder.jpg",
                beds: property.beds || 0,
                baths: property.baths || 0,
                type: 'rent',
              }}
            />
          ))}
        </div>
      )}
    </main>
  )
}
