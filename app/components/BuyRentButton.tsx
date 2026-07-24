"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { ShoppingCart, Home } from "lucide-react"
import { useRouter } from "next/navigation"

interface BuyRentButtonProps {
  propertyId: string
  propertyUserId: string | null
}

export function BuyRentButton({ propertyId, propertyUserId }: BuyRentButtonProps) {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [hasTransaction, setHasTransaction] = React.useState(false)
  const [isOwner, setIsOwner] = React.useState(false)
  const [userId, setUserId] = React.useState<string | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    async function check() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)

      if (propertyUserId && propertyUserId === user.id) {
        setIsOwner(true)
        return
      }

      const { data: cliente } = await supabase
        .from('clientes')
        .select('id_cliente')
        .eq('user_id', user.id)
        .single()

      if (cliente) {
        const { data: trans } = await supabase
          .from('transacciones')
          .select('id_transaccion')
          .eq('id_propiedad', propertyId)
          .eq('id_cliente', cliente.id_cliente)
          .maybeSingle()

        if (trans) setHasTransaction(true)
      }
    }
    check()
  }, [propertyId, propertyUserId])

  async function handleTransaction() {
    setLoading(true)
    setError(null)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push("/auth"); return }

    let clienteId: number
    const { data: cliente } = await supabase
      .from('clientes')
      .select('id_cliente')
      .eq('user_id', user.id)
      .single()

    if (!cliente) {
      const { data: newCliente, error: createError } = await supabase
        .from('clientes')
        .insert({
          nombre: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
          email: user.email || '',
          user_id: user.id,
        })
        .select('id_cliente')
        .single()

      if (createError || !newCliente) {
        setError("No se pudo crear tu perfil de cliente.")
        setLoading(false)
        return
      }
      clienteId = newCliente.id_cliente
    } else {
      clienteId = cliente.id_cliente
    }

    const { data: estado } = await supabase
      .from('estados')
      .select('id_estado')
      .ilike('descripcion', '%pendiente%')
      .single()

    const { error: insertError } = await supabase
      .from('transacciones')
      .insert({
        id_propiedad: propertyId,
        id_cliente: clienteId,
        id_estado: estado?.id_estado || null,
        fecha: new Date().toISOString(),
      })

    if (insertError) {
      setError(insertError.message)
    } else {
      await supabase
        .from('properties')
        .update({ id_estado: estado?.id_estado || null })
        .eq('id', propertyId)

      setSuccess(true)
      setHasTransaction(true)
    }
    setLoading(false)
  }

  if (isOwner) {
    return (
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
        <p className="font-semibold">Esta es tu propiedad</p>
        <p className="text-sm mt-1">Puedes editarla desde tu portafolio.</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800">
        <p className="font-semibold">Solicitud enviada correctamente</p>
        <p className="text-sm mt-1">Un agente se pondrá en contacto contigo pronto.</p>
      </div>
    )
  }

  if (hasTransaction) {
    return (
      <div className="p-4 rounded-xl bg-muted text-muted-foreground">
        <p className="text-sm">Ya tienes una solicitud para esta propiedad.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Button className="w-full" size="lg" onClick={handleTransaction} disabled={loading}>
        <Home className="mr-2 h-5 w-5" />
        {loading ? "Procesando..." : "Comprar esta propiedad"}
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={handleTransaction} disabled={loading}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {loading ? "Procesando..." : "Rentar esta propiedad"}
      </Button>
      {error && <p className="text-destructive text-sm text-center">{error}</p>}
    </div>
  )
}
