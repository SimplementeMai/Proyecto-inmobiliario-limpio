import * as React from "react"
import { PropertyRow } from "./PropertyRow"

interface Property {
  id: string
  slug: string
  title: string
  address: string | null
  price: number
  id_estado: number | null
  estado_descripcion: string | null
}

export function PropertyTable({ properties }: { properties: Property[] }) {
  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 text-xs font-semibold uppercase text-muted-foreground border-b">
        <div className="col-span-6">Property Details</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>
      <div>
        {properties.map((property) => (
          <PropertyRow key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
