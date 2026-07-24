"use client"

import * as React from "react"
import { PropertyForm } from "@/conductor/tracks/add_edit_property_form/implementation/PropertyForm"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useParams } from "next/navigation"

export default function EditarPropiedadPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [property, setProperty] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/auth"); return }

      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      if (!data) { router.push("/dashboard"); return }
      if (data.user_id && data.user_id !== user.id) { router.push("/dashboard"); return }
      setProperty(data)
      setLoading(false)
    }
    load()
  }, [id, router])

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Editar Propiedad</h1>
      <div className="p-6 rounded-xl border bg-card">
        <PropertyForm
          propertyId={id}
          initialData={{
            title: property.title,
            slug: property.slug,
            price: property.price,
            description: property.description,
            address: property.address,
            beds: property.beds,
            baths: property.baths,
            sqft: property.sqft,
            image_urls: property.image_urls,
          }}
        />
      </div>
    </main>
  )
}
