"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { TransaccionesForm } from "@/app/components/TransaccionesForm"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface Transaccion {
  id_transaccion: number
  id_propiedad: string | null
  id_cliente: number | null
  id_estado: number | null
  fecha: string
  properties?: { title: string } | null
  clientes?: { nombre: string } | null
  estados?: { descripcion: string } | null
}

export default function TransaccionesPage() {
  const [transacciones, setTransacciones] = React.useState<Transaccion[]>([])
  const [propiedades, setPropiedades] = React.useState<{ id: string; title: string }[]>([])
  const [clientes, setClientes] = React.useState<{ id_cliente: number; nombre: string }[]>([])
  const [estados, setEstados] = React.useState<{ id_estado: number; descripcion: string }[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<Transaccion | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const router = useRouter()

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth"); return }

    const [transRes, propRes, cliRes, estRes] = await Promise.all([
      supabase.from('transacciones').select('*, properties(title), clientes(nombre), estados(descripcion)').order('fecha', { ascending: false }),
      supabase.from('properties').select('id, title').order('title'),
      supabase.from('clientes').select('id_cliente, nombre').order('nombre'),
      supabase.from('estados').select('id_estado, descripcion').order('id_estado'),
    ])

    setTransacciones(transRes.data || [])
    setPropiedades(propRes.data || [])
    setClientes(cliRes.data || [])
    setEstados(estRes.data || [])
    setLoading(false)
  }

  React.useEffect(() => { fetchData() }, [])

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar esta transacción?")) return
    await supabase.from('transacciones').delete().eq('id_transaccion', id)
    fetchData()
  }

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Transacciones</h1>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Transacción
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl border bg-card">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Editar Transacción" : "Nueva Transacción"}</h2>
          <TransaccionesForm
            transaccion={editing}
            propiedades={propiedades}
            clientes={clientes}
            estados={estados}
            onSaved={() => { setShowForm(false); setEditing(null); fetchData() }}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 text-xs font-semibold uppercase text-muted-foreground border-b">
          <div className="col-span-3">Propiedad</div>
          <div className="col-span-3">Cliente</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2">Fecha</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>
        {transacciones.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay transacciones registradas</div>
        ) : (
          transacciones.map(t => (
            <div key={t.id_transaccion} className="grid grid-cols-12 gap-4 items-center p-4 border-b">
              <div className="col-span-3 font-medium truncate">{t.properties?.title || "—"}</div>
              <div className="col-span-3 text-muted-foreground truncate">{t.clientes?.nombre || "—"}</div>
              <div className="col-span-2">
                <Badge variant={t.estados?.descripcion?.toLowerCase().includes('pendiente') ? "secondary" : "default"}>
                  {t.estados?.descripcion || "—"}
                </Badge>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {new Date(t.fecha).toLocaleDateString('es-MX')}
              </div>
              <div className="col-span-2 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => { setEditing(t); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(t.id_transaccion)}>
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
