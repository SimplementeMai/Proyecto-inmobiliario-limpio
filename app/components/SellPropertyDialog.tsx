"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { supabase } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"

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
  const { isAdmin } = useAdmin()

  React.useEffect(() => {
    if (!open) return
    async function fetchData() {
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

  async function handleSell(forcedEstadoId?: number) {
    if (!selectedCliente) {
      setError("Selecciona un cliente.")
      return
    }
    
    const estadoId = forcedEstadoId || Number(selectedEstado)
    if (!estadoId) {
      setError("Selecciona un estado.")
      return
    }
    
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase.from('transacciones').insert({
      id_propiedad: propertyId,
      id_cliente: Number(selectedCliente),
      id_estado: estadoId,
      fecha: new Date().toISOString(),
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    await supabase
      .from('properties')
      .update({ id_estado: estadoId })
      .eq('id', propertyId)

    setLoading(false)
    onSaved()
    onOpenChange(false)
  }

  const pendingEstado = estados.find(e => e.descripcion === 'Pendiente')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isAdmin ? "Vender/Gestionar Propiedad" : "Reportar Venta/Renta"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Cliente</label>
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
          
          {isAdmin ? (
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
          ) : (
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              Al confirmar, la propiedad quedará como <span className='font-semibold'>Pendiente</span> hasta que el administrador verifique la operación.
            </p>
          )}

          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            {isAdmin ? (
              <Button onClick={() => handleSell()} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirmar
              </Button>
            ) : (
              <Button onClick={() => pendingEstado && handleSell(pendingEstado.id_estado)} disabled={loading || !pendingEstado}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reportar Venta/Renta
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
