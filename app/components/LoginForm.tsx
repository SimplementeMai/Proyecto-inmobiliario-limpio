import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message as string}</p>}
      </div>
      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message as string}</p>}
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  )
}
