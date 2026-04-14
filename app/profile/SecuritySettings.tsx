import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

const securitySchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function SecuritySettings() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(securitySchema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <Input type="password" placeholder="New Password" {...register("newPassword")} />
        {errors.newPassword && <p className="text-destructive text-sm mt-1">{errors.newPassword.message as string}</p>}
      </div>
      <div>
        <Input type="password" placeholder="Confirm New Password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message as string}</p>}
      </div>
      <Button type="submit">Update Password</Button>
    </form>
  )
}
