"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { CalendarPicker } from "./CalendarPicker"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
})

export function VisitBookingForm({ propertyId }: { propertyId: string }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError("Debes iniciar sesión para agendar una visita.")
      setIsLoading(false)
      return
    }

    const { data: cliente } = await supabase
      .from('clientes')
      .select('id_cliente')
      .eq('user_id', user.id)
      .single()

    if (!cliente) {
      setError("No se encontró tu perfil de cliente.")
      setIsLoading(false)
      return
    }

    const { data: property } = await supabase
      .from('properties')
      .select('id')
      .eq('slug', propertyId)
      .single()

    if (!property) {
      setError("No se encontró la propiedad.")
      setIsLoading(false)
      return
    }

    const { data: estado } = await supabase
      .from('estados')
      .select('id_estado')
      .ilike('descripcion', '%pendiente%')
      .single()

    const { error: insertError } = await supabase.from('transacciones').insert({
      id_propiedad: property.id,
      id_cliente: cliente.id_cliente,
      id_estado: estado?.id_estado || null,
      fecha: new Date(data.date).toISOString(),
    })

    if (insertError) {
      setError("Error al agendar la visita. Inténtalo de nuevo.")
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-600 font-medium">Visita agendada correctamente.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => router.back()}>Volver a la propiedad</Button>
          <Button variant="outline" onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Your Name" {...register("name")} />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message as string}</p>}
      </div>
      <div>
        <CalendarPicker onChange={(date) => setValue("date", date)} />
        {errors.date && <p className="text-destructive text-sm mt-1">{errors.date.message as string}</p>}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Agendar Visita
      </Button>
    </form>
  )
}
