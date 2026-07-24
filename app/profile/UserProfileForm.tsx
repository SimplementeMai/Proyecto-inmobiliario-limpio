import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

interface Cliente {
  id_cliente: number
  nombre: string
  email: string
  user_id: string | null
}

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
})

interface UserProfileFormProps {
  user: User | null
  cliente: Cliente | null
  onRefresh: () => Promise<void>
}

export function UserProfileForm({ user, cliente, onRefresh }: UserProfileFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: cliente?.nombre || user?.user_metadata?.full_name || "",
      email: user?.email || "",
    },
  })

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: data.fullName },
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (cliente) {
      const { error: dbError } = await supabase
        .from('Clientes')
        .update({ nombre: data.fullName, email: data.email })
        .eq('id_cliente', cliente.id_cliente)

      if (dbError) {
        setError(dbError.message)
        setIsLoading(false)
        return
      }
    }

    await onRefresh()
    setSuccess(true)
    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Full Name" {...register("fullName")} />
        {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Email Address" {...register("email")} />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message as string}</p>}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Cambios guardados correctamente.</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar Cambios
      </Button>
    </form>
  )
}
