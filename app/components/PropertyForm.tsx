import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
})

export function PropertyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <Input placeholder="Enter property title" {...register("title")} />
        {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Enter price" {...register("price")} />
        {errors.price && <p className="text-destructive text-sm mt-1">{errors.price.message as string}</p>}
      </div>
      <Button type="submit">Save Property</Button>
    </form>
  )
}
