"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

const agenteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  telefono: z.string().optional(),
})

interface AgentesFormProps {
  agente?: { id_agente: number; nombre: string; telefono: string | null } | null
  onSaved: () => void
  onCancel: () => void
}

export function AgentesForm({ agente, onSaved, onCancel }: AgentesFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(agenteSchema),
    defaultValues: {
      nombre: agente?.nombre || "",
      telefono: agente?.telefono || "",
    },
  })

  const onSubmit = async (data: z.infer<typeof agenteSchema>) => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    let result
    if (agente) {
      result = await supabase
        .from('agentes')
        .update({ nombre: data.nombre, telefono: data.telefono || null })
        .eq('id_agente', agente.id_agente)
    } else {
      result = await supabase
        .from('agentes')
        .insert({ nombre: data.nombre, telefono: data.telefono || null })
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
        <Input placeholder="Nombre del agente" {...register("nombre")} />
        {errors.nombre && <p className="text-destructive text-sm mt-1">{errors.nombre.message}</p>}
      </div>
      <div>
        <Input placeholder="Teléfono (opcional)" {...register("telefono")} />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {agente ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  )
}
