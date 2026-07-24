"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Loader2, Eye, EyeOff } from "lucide-react"

const registerSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es obligatorio"),
  email: z.string().email("Dirección de correo no válida"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
})

export function RegistrationForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      }),
    })

    const result = await res.json()

    if (!res.ok) {
      setError(result.error || 'Error al registrar')
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-600 font-medium">Cuenta creada correctamente.</p>
        <p className="text-sm text-muted-foreground">Ya puedes iniciar sesión con tu correo y contraseña.</p>
        <Button variant="outline" onClick={() => router.push("/auth")}>Ir a Iniciar Sesión</Button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Nombre Completo" {...register("fullName")} />
        {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message as string}</p>}
      </div>
      <div className="relative">
        <Input type={showPassword ? "text" : "password"} placeholder="Contraseña" {...register("password")} className="pr-10" />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message as string}</p>}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Registrarse
      </Button>
    </form>
  )
}
