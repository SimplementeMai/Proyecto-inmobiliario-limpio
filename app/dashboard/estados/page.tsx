"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { EstadosForm } from "@/app/components/EstadosForm"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface Estado {
  id_estado: number
  descripcion: string
}

export default function EstadosPage() {
  const [estados, setEstados] = React.useState<Estado[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<Estado | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const router = useRouter()

  async function fetchData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth"); return }

    const { data } = await supabase.from('estados').select('*').order('id_estado')
    setEstados(data || [])
    setLoading(false)
  }

  React.useEffect(() => { fetchData() }, [])

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este estado?")) return
    const supabase = createClient()
    await supabase.from('estados').delete().eq('id_estado', id)
    fetchData()
  }

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Estados</h1>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Estado
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border bg-card">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Editar Estado" : "Nuevo Estado"}</h2>
          <EstadosForm
            estado={editing}
            onSaved={() => { setShowForm(false); setEditing(null); fetchData() }}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 text-xs font-semibold uppercase text-muted-foreground border-b">
          <div className="col-span-6">Descripción</div>
          <div className="col-span-2">ID</div>
          <div className="col-span-4 text-right">Acciones</div>
        </div>
        {estados.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay estados registrados</div>
        ) : (
          estados.map(estado => (
            <div key={estado.id_estado} className="grid grid-cols-12 gap-4 items-center p-4 border-b">
              <div className="col-span-6 font-medium">{estado.descripcion}</div>
              <div className="col-span-2 text-muted-foreground text-sm">#{estado.id_estado}</div>
              <div className="col-span-4 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => { setEditing(estado); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(estado.id_estado)}>
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
