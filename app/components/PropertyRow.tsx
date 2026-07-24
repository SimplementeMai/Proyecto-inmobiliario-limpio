import * as React from "react"
import { Badge } from "@/app/components/ui/badge"

interface Property {
  id: string
  slug: string
  title: string
  address: string | null
  price: number
  id_estado: number | null
  estado_descripcion: string | null
}

export function PropertyRow({ property }: { property: Property }) {
  const formattedPrice = `$${(property.price / 1000000).toFixed(2)}M`
  const status = property.estado_descripcion || "Sin estado"

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 border-b">
      <div className="col-span-6">
        <h4 className="font-semibold">{property.title}</h4>
        <p className="text-sm text-muted-foreground">{property.address || "Sin dirección"}</p>
      </div>
      <div className="col-span-2 font-bold">{formattedPrice}</div>
      <div className="col-span-2">
        <Badge variant={property.id_estado ? "default" : "secondary"}>
          {status}
        </Badge>
      </div>
      <div className="col-span-2 text-right">
        {/* Acciones */}
      </div>
    </div>
  )
}
