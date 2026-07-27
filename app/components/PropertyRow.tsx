import * as React from "react"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { PropertyForm } from "@/conductor/tracks/add_edit_property_form/implementation/PropertyForm"
import { SellPropertyDialog } from "./SellPropertyDialog"
import { Pencil, Trash2, ExternalLink, DollarSign } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"

interface Property {
  id: string
  slug: string
  title: string
  address: string | null
  price: number
  id_estado: number | null
  estado_descripcion: string | null
  user_id: string | null
}

export function PropertyRow({ property, isOwner }: { property: Property; isOwner?: boolean }) {
  const [editOpen, setEditOpen] = React.useState(false)
  const [sellOpen, setSellOpen] = React.useState(false)
  const [propertyData, setPropertyData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)
  const formattedPrice = `$${(property.price / 1000000).toFixed(2)}M`
  const status = property.estado_descripcion || "Sin estado"

  async function openEdit() {
    setLoading(true)
    setEditOpen(true)
    const { data } = await supabase.from('properties').select('*').eq('id', property.id).single()
    setPropertyData(data)
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 border-b">
      <div className="col-span-5">
        <h4 className="font-semibold">{property.title}</h4>
        <p className="text-sm text-muted-foreground">{property.address || "Sin dirección"}</p>
      </div>
      <div className="col-span-2 font-bold">{formattedPrice}</div>
      <div className="col-span-2">
        <Badge variant={property.id_estado ? "default" : "secondary"}>
          {status}
        </Badge>
      </div>
      <div className="col-span-3 flex gap-2 justify-end">
        <Link href={`/property/${property.slug}`}>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
        {isOwner && (
          <>
            <Button variant="outline" size="sm" onClick={() => setSellOpen(true)}>
              <DollarSign className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={openEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={async () => {
              if (confirm("¿Eliminar esta propiedad?")) {
                await supabase.from('properties').delete().eq('id', property.id)
                window.location.reload()
              }
            }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Propiedad</DialogTitle>
          </DialogHeader>
          {loading ? (
            <p className="text-muted-foreground py-4">Cargando...</p>
          ) : propertyData ? (
            <PropertyForm
              propertyId={property.id}
              initialData={{
                title: propertyData.title,
                slug: propertyData.slug,
                price: propertyData.price,
                description: propertyData.description,
                address: propertyData.address,
                beds: propertyData.beds,
                baths: propertyData.baths,
                sqft: propertyData.sqft,
                image_urls: propertyData.image_urls,
              }}
              onSaved={() => {
                setEditOpen(false)
                window.location.reload()
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <SellPropertyDialog
        open={sellOpen}
        onOpenChange={setSellOpen}
        propertyId={property.id}
        onSaved={() => window.location.reload()}
      />
    </div>
  )
}
