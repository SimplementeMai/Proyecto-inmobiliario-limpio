import { createClient } from "@/lib/supabase/server"
import { PropertyGallery } from "@/app/components/PropertyGallery"
import { PropertyHeader } from "@/app/components/PropertyHeader"
import { PropertyFeatures } from "@/app/components/PropertyFeatures"
import { AgentContact } from "@/app/components/AgentContact"
import { AboutHome } from "@/app/components/AboutHome"
import { notFound } from "next/navigation"

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', id)
    .single()

  if (error) {
    console.error('Error fetching property:', error.message, error.details)
    notFound()
  }

  if (!property) {
    console.error('Property not found for slug:', id)
    notFound()
  }

  let agent = null
  if (property.id_agente) {
    const { data: agentData } = await supabase
      .from('agentes')
      .select('nombre, telefono')
      .eq('id_agente', property.id_agente)
      .single()
    if (agentData) {
      agent = { nombre: agentData.nombre, telefono: agentData.telefono }
    }
  }

  const features = [
    { label: 'Recámaras', value: property.beds?.toString() ?? 'N/A' },
    { label: 'Baños', value: property.baths?.toString() ?? 'N/A' },
    { label: 'Área (sqft)', value: property.sqft?.toLocaleString() ?? 'N/A' },
  ]

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {property.image_urls && property.image_urls.length > 0 && (
            <PropertyGallery images={property.image_urls} />
          )}
          <PropertyHeader property={{
              title: property.title,
              price: Number(property.price),
              location: property.address || "Sin dirección"
          }} />
          <PropertyFeatures features={features} />
          <AboutHome 
            description={property.description || "Sin descripción"}
            amenities={
              typeof property.amenities === 'string'
                ? JSON.parse(property.amenities || '[]')
                : Array.isArray(property.amenities) ? property.amenities : []
            }
          />
        </div>
        <div className="lg:col-span-4">
          <AgentContact agent={agent} propertySlug={id} />
        </div>
      </div>
    </main>
  )
}
