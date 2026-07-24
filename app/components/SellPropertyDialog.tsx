"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface SellPropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  propertyId: string
  onSaved: () => void
}

export function SellPropertyDialog({ open, onOpenChange, propertyId, onSaved }: SellPropertyDialogProps) {
  const [clientes, setClientes] = React.useState<{ id_cliente: number; nombre: string }[]>([])
  const [estados, setEstados] = React.useState<{ id_estado: number; descripcion: string }[]>([])
  const [selectedCliente, setSelectedCliente] = React.useState<string>("")
  const [selectedEstado, setSelectedEstado] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) return
    async function fetchData() {
      const supabase = createClient()
      const [cliRes, estRes] = await Promise.all([
        supabase.from('clientes').select('id_cliente, nombre').order('nombre'),
        supabase.from('estados').select('id_estado, descripcion').order('id_estado'),
      ])
      setClientes(cliRes.data || [])
      setEstados(estRes.data || [])
    }
    fetchData()
    setSelectedCliente("")
    setSelectedEstado("")
    setError(null)
  }, [open])

  async function handleSell() {
    if (!selectedCliente || !selectedEstado) {
      setError("Selecciona un cliente y un estado.")
      return
    }
    setLoading(true)
    setError(null)
    const supabase = createClient()

    const { error: insertError } = await supabase.from('transacciones').insert({
      id_propiedad: propertyId,
      id_cliente: Number(selectedCliente),
      id_estado: Number(selectedEstado),
      fecha: new Date().toISOString(),
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    await supabase
      .from('properties')
      .update({ id_estado: Number(selectedEstado) })
      .eq('id', propertyId)

    setLoading(false)
    onSaved()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Vender Propiedad</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Cliente (comprador)</label>
            <Select value={selectedCliente} onValueChange={setSelectedCliente}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map(c => (
                  <SelectItem key={c.id_cliente} value={c.id_cliente.toString()}>
                    {c.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Estado</label>
            <Select value={selectedEstado} onValueChange={setSelectedEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {estados.map(e => (
                  <SelectItem key={e.id_estado} value={e.id_estado.toString()}>
                    {e.descripcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button onClick={handleSell} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Venta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
