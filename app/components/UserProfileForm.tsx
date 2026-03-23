import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
})

export function UserProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <Input placeholder="Full Name" {...register("fullName")} />
        {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Email Address" {...register("email")} />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message as string}</p>}
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}
