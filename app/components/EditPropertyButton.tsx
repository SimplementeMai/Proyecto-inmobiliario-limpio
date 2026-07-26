"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { PropertyForm } from "@/conductor/tracks/add_edit_property_form/implementation/PropertyForm"
import { Pencil } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface EditPropertyButtonProps {
  propertyId: string
  propertyUserId: string | null
}

export function EditPropertyButton({ propertyId, propertyUserId }: EditPropertyButtonProps) {
  const [open, setOpen] = React.useState(false)
  const [userId, setUserId] = React.useState<string | null>(null)
  const [propertyData, setPropertyData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id)
    })
  }, [])

  const isOwner = userId && (userId === propertyUserId || !propertyUserId)

  if (!isOwner) return null

  async function openEdit() {
    setLoading(true)
    setOpen(true)
    const { data } = await supabase.from('properties').select('*').eq('id', propertyId).single()
    setPropertyData(data)
    setLoading(false)
  }

  return (
    <>
      <Button variant="outline" className="w-full gap-2" onClick={openEdit}>
        <Pencil className="h-4 w-4" /> Editar Propiedad
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Propiedad</DialogTitle>
          </DialogHeader>
          {loading ? (
            <p className="text-muted-foreground py-4">Cargando...</p>
          ) : propertyData ? (
            <PropertyForm
              propertyId={propertyId}
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
                setOpen(false)
                window.location.reload()
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
