"use client"

import * as React from "react"
import { StatCard } from "@/app/components/StatCard"
import { DashboardHeader } from "@/app/components/DashboardHeader"
import { PropertyTable } from "@/app/components/PropertyTable"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Property {
  id: string
  slug: string
  title: string
  address: string | null
  price: number
  id_estado: number | null
  estado_descripcion: string | null
}

export default function DashboardPage() {
  const [properties, setProperties] = React.useState<Property[]>([])
  const [stats, setStats] = React.useState({ total: 0, activas: 0, pendientes: 0 })
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    async function fetchDashboard() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth")
        return
      }

      const { data: propertiesData } = await supabase
        .from('properties')
        .select('id, slug, title, address, price, id_estado, Estados(id_estado, descripcion)')

      if (propertiesData) {
        const formatted = propertiesData.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          address: p.address,
          price: p.price,
          id_estado: p.id_estado,
          estado_descripcion: p.Estados?.descripcion || null,
        }))
        setProperties(formatted)

        const total = formatted.length
        const pendientes = formatted.filter(p => p.estado_descripcion?.toLowerCase().includes('pendiente')).length
        const activas = total - pendientes
        setStats({ total, activas, pendientes })
      }

      setLoading(false)
    }
    fetchDashboard()
  }, [router])

  if (loading) {
    return <main className="container mx-auto px-4 py-12">Cargando...</main>
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <DashboardHeader title="My Properties" />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Listings" value={stats.total.toString()} icon="apartment" />
        <StatCard title="Active Properties" value={stats.activas.toString()} icon="check_circle" />
        <StatCard title="Pending Sale" value={stats.pendientes.toString()} icon="pending" />
      </div>

      <PropertyTable properties={properties} />
    </main>
  )
}
