"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

const estadoSchema = z.object({
  descripcion: z.string().min(1, "La descripción es obligatoria"),
})

interface EstadosFormProps {
  estado?: { id_estado: number; descripcion: string } | null
  onSaved: () => void
  onCancel: () => void
}

export function EstadosForm({ estado, onSaved, onCancel }: EstadosFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(estadoSchema),
    defaultValues: {
      descripcion: estado?.descripcion || "",
    },
  })

  const onSubmit = async (data: z.infer<typeof estadoSchema>) => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    let result
    if (estado) {
      result = await supabase
        .from('estados')
        .update({ descripcion: data.descripcion })
        .eq('id_estado', estado.id_estado)
    } else {
      result = await supabase
        .from('estados')
        .insert({ descripcion: data.descripcion })
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
        <Input placeholder="Nombre del estado" {...register("descripcion")} />
        {errors.descripcion && <p className="text-destructive text-sm mt-1">{errors.descripcion.message}</p>}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {estado ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  )
}
