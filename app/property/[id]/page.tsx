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

  // Buscar propiedad por slug en Supabase
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', id)
    .single()

  if (error || !property) {
    notFound()
  }

  const features = [
    { label: 'Recámaras', value: property.beds.toString() },
    { label: 'Baños', value: property.baths.toString() },
    { label: 'Área (sqft)', value: property.sqft.toLocaleString() },
  ]

  const agent = {
    name: 'Sarah Jenkins',
    role: 'Agente Destacada',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w'
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <PropertyGallery images={property.image_urls} />
          <PropertyHeader property={{
              title: property.title,
              price: Number(property.price),
              location: property.address
          }} />
          <PropertyFeatures features={features} />
          <AboutHome 
            description={property.description}
            amenities={typeof property.amenities === 'string' ? JSON.parse(property.amenities) : property.amenities}
          />
        </div>
        <div className="lg:col-span-4">
          <AgentContact agent={agent} />
        </div>
      </div>
    </main>
  )
}
