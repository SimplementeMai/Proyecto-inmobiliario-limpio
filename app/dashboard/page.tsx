"use client"

import * as React from "react"
import { StatCard } from "@/app/components/StatCard"
import { DashboardHeader } from "@/app/components/DashboardHeader"
import { PropertyTable } from "@/app/components/PropertyTable"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Users, Tag, ArrowRightLeft } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"

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

export default function DashboardPage() {
  const [properties, setProperties] = React.useState<Property[]>([])
  const [stats, setStats] = React.useState({ total: 0, activas: 0, pendientes: 0 })
  const [loading, setLoading] = React.useState(true)
  const [userId, setUserId] = React.useState<string | null>(null)
  const router = useRouter()
  const { isAdmin } = useAdmin()

  React.useEffect(() => {
    async function fetchDashboard() {
      // 1. Esperar a que la sesión esté lista antes de hacer consultas pesadas
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/auth")
        return
      }
      
      const user = session.user
      setUserId(user.id)

      const { data: propertiesData, error: fetchError } = await supabase
        .from('properties')
        .select('id, slug, title, address, price, id_estado, estados!properties_id_estado_fkey(id_estado, descripcion), user_id')
        .or(`user_id.is.null,user_id.eq.${user.id}`)

      if (fetchError) {
        console.error("Error de fetch:", fetchError);
      }

      if (propertiesData) {
        const formatted = propertiesData.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          address: p.address,
          price: p.price,
          id_estado: p.id_estado,
          estado_descripcion: p.estados?.descripcion || null,
          user_id: p.user_id,
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

      {isAdmin && (
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/dashboard/agentes">
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" /> Agentes
            </Button>
          </Link>
          <Link href="/dashboard/clientes">
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" /> Clientes
            </Button>
          </Link>
          <Link href="/dashboard/estados">
            <Button variant="outline" className="gap-2">
              <Tag className="h-4 w-4" /> Estados
            </Button>
          </Link>
          <Link href="/dashboard/transacciones">
            <Button variant="outline" className="gap-2">
              <ArrowRightLeft className="h-4 w-4" /> Transacciones
            </Button>
          </Link>
        </div>
      )}

      <PropertyTable properties={properties} userId={userId} />
    </main>
  )
}
