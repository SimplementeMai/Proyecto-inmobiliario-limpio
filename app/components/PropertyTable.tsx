import * as React from "react"
import { PropertyRow } from "./PropertyRow"

interface Property {
  title: string
  location: string
  price: number
  status: "Active" | "Pending"
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
          <PropertyRow key={property.title} property={property} />
        ))}
      </div>
    </div>
  )
}
