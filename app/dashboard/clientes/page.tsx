"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"

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
  const [nombre, setNombre] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  async function fetchData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth"); return }

    const { data } = await supabase.from('clientes').select('*').order('id_cliente')
    setClientes(data || [])
    setLoading(false)
  }

  React.useEffect(() => { fetchData() }, [])

  async function handleSave() {
    if (!editing) return
    setError(null)
    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('clientes')
      .update({ nombre, email })
      .eq('id_cliente', editing.id_cliente)

    if (updateError) {
      setError(updateError.message)
    } else {
      setEditing(null)
      fetchData()
    }
  }

  if (loading) return <main className="container mx-auto px-4 py-12">Cargando...</main>

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </div>

      {editing && (
        <div className="mb-8 p-6 rounded-xl border bg-card">
          <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
          <div className="space-y-4">
            <Input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
              <Button onClick={handleSave}>Actualizar</Button>
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
