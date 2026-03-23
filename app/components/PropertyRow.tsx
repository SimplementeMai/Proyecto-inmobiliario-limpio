import * as React from "react"
import { Badge } from "@/app/components/ui/badge"

interface Property {
  title: string
  location: string
  price: number
  status: "Active" | "Pending"
}

export function PropertyRow({ property }: { property: Property }) {
  const formattedPrice = `$${(property.price / 1000000).toFixed(2)}M`

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 border-b">
      <div className="col-span-6">
        <h4 className="font-semibold">{property.title}</h4>
        <p className="text-sm text-muted-foreground">{property.location}</p>
      </div>
      <div className="col-span-2 font-bold">{formattedPrice}</div>
      <div className="col-span-2">
        <Badge variant={property.status === "Active" ? "default" : "secondary"}>
          {property.status}
        </Badge>
      </div>
      <div className="col-span-2 text-right">
        {/* Acciones */}
      </div>
    </div>
  )
}
