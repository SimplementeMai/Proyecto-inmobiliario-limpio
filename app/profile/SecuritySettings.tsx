import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

const securitySchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function SecuritySettings() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(securitySchema),
  })

  const onSubmit = async (data: z.infer<typeof securitySchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      reset()
    }
    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input type="password" placeholder="New Password" {...register("newPassword")} />
        {errors.newPassword && <p className="text-destructive text-sm mt-1">{errors.newPassword.message as string}</p>}
      </div>
      <div>
        <Input type="password" placeholder="Confirm New Password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message as string}</p>}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Contraseña actualizada correctamente.</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Actualizar Contraseña
      </Button>
    </form>
  )
}
