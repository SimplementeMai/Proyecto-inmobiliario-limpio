"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { CalendarPicker } from "./CalendarPicker"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required").refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, {
    message: "La fecha no puede ser anterior a hoy",
  }),
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

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth")
      return
    }

    let { data: cliente } = await supabase
      .from('clientes')
      .select('id_cliente')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!cliente) {
      const { data: newCliente } = await supabase
        .from('clientes')
        .insert({
          nombre: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
          email: user.email || '',
          user_id: user.id,
        })
        .select('id_cliente')
        .single()
      cliente = newCliente
    }

    if (!cliente) {
      setError("No se encontró tu perfil de cliente.")
      setIsLoading(false)
      return
    }

    const { data: property } = await supabase
      .from('properties')
      .select('id, user_id')
      .eq('slug', propertyId)
      .single()

    if (!property) {
      setError("No se encontró la propiedad.")
      setIsLoading(false)
      return
    }

    if (property.user_id === user.id) {
      setError("No puedes agendar una visita en tu propia propiedad.")
      setIsLoading(false)
      return
    }

    // Check for existing active visits
    console.log("Checking active visit for:", { propertyId: property.id, clientId: cliente.id_cliente });
    const { data: activeVisit } = await supabase
      .from('visitas')
      .select('id_visita, estado')
      .eq('id_propiedad', property.id)
      .eq('id_cliente', cliente.id_cliente)
      .not('estado', 'in', '("realizada","cancelada")')
      .maybeSingle()

    // Note: The above syntax is what was used. Let's try the correct array-based syntax for Supabase.
    // If the above returned null, it might be that 'estado' is exactly equal to one of those, 
    // or the 'in' operator syntax is incorrect. Let's use filter to be sure.
    
    // Actually, let's fetch all and filter client-side to be 100% sure we catch it.
    const { data: allVisits } = await supabase
      .from('visitas')
      .select('id_visita, estado')
      .eq('id_propiedad', property.id)
      .eq('id_cliente', cliente.id_cliente)
    
    const activeVisitFound = allVisits?.find(v => v.estado !== 'realizada' && v.estado !== 'cancelada');
    console.log("All visits for user/prop:", allVisits, "Active visit found:", activeVisitFound);
    
    if (activeVisitFound) {
      setError("Ya tienes una visita activa para esta propiedad. Debes cancelarla o completar la anterior antes de agendar otra.")
      setIsLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('visitas').insert({
      id_propiedad: property.id,
      id_cliente: cliente.id_cliente,
      fecha_hora: new Date(data.date).toISOString(),
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
