"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  address: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  sqft: z.string().optional(),
})

interface PropertyFormProps {
  propertyId?: string
  initialData?: {
    title: string
    slug: string
    price: number
    description: string | null
    address: string | null
    beds: number | null
    baths: number | null
    sqft: number | null
  }
}

export function PropertyForm({ propertyId, initialData }: PropertyFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    values: initialData ? {
      title: initialData.title,
      slug: initialData.slug,
      price: initialData.price.toString(),
      description: initialData.description || "",
      address: initialData.address || "",
      beds: initialData.beds?.toString() || "",
      baths: initialData.baths?.toString() || "",
      sqft: initialData.sqft?.toString() || "",
    } : undefined,
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    const propertyData = {
      title: data.title,
      slug: data.slug,
      price: Number(data.price),
      description: data.description || null,
      address: data.address || null,
      beds: data.beds ? Number(data.beds) : null,
      baths: data.baths ? Number(data.baths) : null,
      sqft: data.sqft ? Number(data.sqft) : null,
    }

    let result
    if (propertyId) {
      result = await supabase.from('properties').update(propertyData).eq('id', propertyId)
    } else {
      result = await supabase.from('properties').insert(propertyData)
    }

    if (result.error) {
      setError(result.error.message)
    } else {
      setSuccess(true)
    }
    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Property title" {...register("title")} />
        {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message as string}</p>}
      </div>
      <div>
        <Input placeholder="property-slug-url" {...register("slug")} />
        {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Price" type="number" {...register("price")} />
        {errors.price && <p className="text-destructive text-sm mt-1">{errors.price.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Description" {...register("description")} />
      </div>
      <div>
        <Input placeholder="Address" {...register("address")} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Input placeholder="Beds" type="number" {...register("beds")} />
        </div>
        <div>
          <Input placeholder="Baths" type="number" {...register("baths")} />
        </div>
        <div>
          <Input placeholder="Sqft" type="number" {...register("sqft")} />
        </div>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Propiedad guardada correctamente.</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {propertyId ? "Actualizar Propiedad" : "Crear Propiedad"}
      </Button>
    </form>
  )
}
