"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { AgentesForm } from "@/app/components/AgentesForm"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface Agente {
  id_agente: number
  nombre: string
  telefono: string | null
}

export default function AgentesPage() {
  const [agentes, setAgentes] = React.useState<Agente[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<Agente | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const router = useRouter()

  async function fetchData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth"); return }

    const { data } = await supabase.from('agentes').select('*').order('id_agente')
    setAgentes(data || [])
    setLoading(false)
  }

  React.useEffect(() => { fetchData() }, [])

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este agente?")) return
    const supabase = createClient()
    await supabase.from('agentes').delete().eq('id_agente', id)
    fetchData()
  }

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Agentes</h1>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Agente
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border bg-card">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Editar Agente" : "Nuevo Agente"}</h2>
          <AgentesForm
            agente={editing}
            onSaved={() => { setShowForm(false); setEditing(null); fetchData() }}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 text-xs font-semibold uppercase text-muted-foreground border-b">
          <div className="col-span-4">Nombre</div>
          <div className="col-span-4">Teléfono</div>
          <div className="col-span-4 text-right">Acciones</div>
        </div>
        {agentes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay agentes registrados</div>
        ) : (
          agentes.map(agente => (
            <div key={agente.id_agente} className="grid grid-cols-12 gap-4 items-center p-4 border-b">
              <div className="col-span-4 font-medium">{agente.nombre}</div>
              <div className="col-span-4 text-muted-foreground">{agente.telefono || "—"}</div>
              <div className="col-span-4 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => { setEditing(agente); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(agente.id_agente)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
