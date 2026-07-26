"use client"

import * as React from "react"
import { PropertyForm } from "@/conductor/tracks/add_edit_property_form/implementation/PropertyForm"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function NuevaPropiedadPage() {
  const router = useRouter()
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/auth"); return }
      setReady(true)
    }
    check()
  }, [router])

  if (!ready) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Nueva Propiedad</h1>
      <div className="p-6 rounded-xl border bg-card">
        <PropertyForm />
      </div>
    </main>
  )
}
