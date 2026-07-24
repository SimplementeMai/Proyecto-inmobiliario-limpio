"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

const transaccionSchema = z.object({
  id_propiedad: z.string().min(1, "Selecciona una propiedad"),
  id_cliente: z.string().min(1, "Selecciona un cliente"),
  id_estado: z.string().min(1, "Selecciona un estado"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
})

interface TransaccionesFormProps {
  transaccion?: {
    id_transaccion: number
    id_propiedad: string | null
    id_cliente: number | null
    id_estado: number | null
    fecha: string
  } | null
  propiedades: { id: string; title: string }[]
  clientes: { id_cliente: number; nombre: string }[]
  estados: { id_estado: number; descripcion: string }[]
  onSaved: () => void
  onCancel: () => void
}

export function TransaccionesForm({
  transaccion, propiedades, clientes, estados, onSaved, onCancel
}: TransaccionesFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(transaccionSchema),
    defaultValues: {
      id_propiedad: transaccion?.id_propiedad || "",
      id_cliente: transaccion?.id_cliente?.toString() || "",
      id_estado: transaccion?.id_estado?.toString() || "",
      fecha: transaccion?.fecha ? transaccion.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: z.infer<typeof transaccionSchema>) => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    const payload = {
      id_propiedad: data.id_propiedad,
      id_cliente: Number(data.id_cliente),
      id_estado: Number(data.id_estado),
      fecha: new Date(data.fecha).toISOString(),
    }

    let result
    if (transaccion) {
      result = await supabase
        .from('transacciones')
        .update(payload)
        .eq('id_transaccion', transaccion.id_transaccion)
    } else {
      result = await supabase
        .from('transacciones')
        .insert(payload)
    }

    if (result.error) {
      setError(result.error.message)
    } else {
      onSaved()
    }
    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("id_propiedad")}>
          <option value="">Seleccionar propiedad</option>
          {propiedades.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        {errors.id_propiedad && <p className="text-destructive text-sm mt-1">{errors.id_propiedad.message}</p>}
      </div>
      <div>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("id_cliente")}>
          <option value="">Seleccionar cliente</option>
          {clientes.map(c => (
            <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
          ))}
        </select>
        {errors.id_cliente && <p className="text-destructive text-sm mt-1">{errors.id_cliente.message}</p>}
      </div>
      <div>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("id_estado")}>
          <option value="">Seleccionar estado</option>
          {estados.map(e => (
            <option key={e.id_estado} value={e.id_estado}>{e.descripcion}</option>
          ))}
        </select>
        {errors.id_estado && <p className="text-destructive text-sm mt-1">{errors.id_estado.message}</p>}
      </div>
      <div>
        <Input type="date" {...register("fecha")} />
        {errors.fecha && <p className="text-destructive text-sm mt-1">{errors.fecha.message}</p>}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {transaccion ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  )
}
