"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Pencil, Plus } from "lucide-react"

interface Cliente {
  id_cliente: number
  nombre: string
  email: string
  user_id: string | null
}

export default function ClientesPage() {
  const [clientes, setClientes] = React.useState<Cliente[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<Cliente | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [nombre, setNombre] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth"); return }

    const res = await fetch("/api/clientes")
    const data = await res.json()
    setClientes(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  React.useEffect(() => { fetchData() }, [])

  async function handleSave() {
    setError(null)

    if (editing) {
      const { error: updateError } = await supabase
        .from('clientes')
        .update({ nombre, email })
        .eq('id_cliente', editing.id_cliente)
      if (updateError) { setError(updateError.message); return }
    } else {
      const { error: insertError } = await supabase
        .from('clientes')
        .insert({ nombre, email })
      if (insertError) { setError(insertError.message); return }
    }

    setEditing(null)
    setShowForm(false)
    setNombre("")
    setEmail("")
    fetchData()
  }

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button onClick={() => { setEditing(null); setNombre(""); setEmail(""); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      {(showForm || editing) && (
        <div className="mb-8 p-6 rounded-xl border bg-card">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Editar Cliente" : "Nuevo Cliente"}</h2>
          <div className="space-y-4">
            <Input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => { setEditing(null); setShowForm(false); setNombre(""); setEmail("") }}>Cancelar</Button>
              <Button onClick={handleSave}>{editing ? "Actualizar" : "Crear"}</Button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 text-xs font-semibold uppercase text-muted-foreground border-b">
          <div className="col-span-3">Nombre</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-3">User ID</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>
        {clientes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay clientes registrados</div>
        ) : (
          clientes.map(cliente => (
            <div key={cliente.id_cliente} className="grid grid-cols-12 gap-4 items-center p-4 border-b">
              <div className="col-span-3 font-medium">{cliente.nombre}</div>
              <div className="col-span-4 text-muted-foreground truncate">{cliente.email}</div>
              <div className="col-span-3 text-sm text-muted-foreground truncate">{cliente.user_id ? `${cliente.user_id.substring(0, 8)}...` : "—"}</div>
              <div className="col-span-2 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => {
                  setEditing(cliente)
                  setNombre(cliente.nombre)
                  setEmail(cliente.email)
                  setShowForm(true)
                }}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
