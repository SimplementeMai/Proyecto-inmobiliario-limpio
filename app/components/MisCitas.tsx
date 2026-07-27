"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase/client"
import { Badge } from "@/app/components/ui/badge"

interface Visita {
  id_visita: number
  fecha_hora: string
  properties: { title: string }
}

export function MisCitas() {
  const [visitas, setVisitas] = React.useState<Visita[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchVisitas() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: cliente } = await supabase
        .from('clientes')
        .select('id_cliente')
        .eq('user_id', user.id)
        .maybeSingle()

      if (cliente) {
        const { data } = await supabase
          .from('visitas')
          .select('id_visita, fecha_hora, properties(title)')
          .eq('id_cliente', cliente.id_cliente)
          .order('fecha_hora', { ascending: false })

        setVisitas(data || [])
      }
      setLoading(false)
    }
    fetchVisitas()
  }, [])

  if (loading) return <div>Cargando citas...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Mis Citas</h2>
      {visitas.length === 0 ? (
        <p className="text-muted-foreground">No tienes citas agendadas.</p>
      ) : (
        <div className="space-y-2">
          {visitas.map((visita) => (
            <div key={visita.id_visita} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{visita.properties?.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(visita.fecha_hora).toLocaleDateString()}
                </p>
              </div>
              <Badge>Pendiente</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
