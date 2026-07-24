"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Upload, X } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio").regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  price: z.string().min(1, "El precio es obligatorio"),
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
    image_urls: string[] | null
  }
  onSaved?: () => void
}

export function PropertyForm({ propertyId, initialData, onSaved }: PropertyFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [imageUrls, setImageUrls] = React.useState<string[]>(initialData?.image_urls || [])
  const [newImageUrl, setNewImageUrl] = React.useState("")

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

  function addImageUrl() {
    const url = newImageUrl.trim()
    if (url && !imageUrls.includes(url)) {
      setImageUrls([...imageUrls, url])
      setNewImageUrl("")
    }
  }

  function removeImageUrl(index: number) {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const propertyData = {
      title: data.title,
      slug: data.slug,
      price: Number(data.price),
      description: data.description || null,
      address: data.address || null,
      beds: data.beds ? Number(data.beds) : null,
      baths: data.baths ? Number(data.baths) : null,
      sqft: data.sqft ? Number(data.sqft) : null,
      image_urls: imageUrls.length > 0 ? imageUrls : null,
      ...(user ? { user_id: user.id } : {}),
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
      if (onSaved) {
        setTimeout(() => onSaved(), 800)
      }
    }
    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Título de la propiedad" {...register("title")} />
        {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message as string}</p>}
      </div>
      <div>
        <Input placeholder="slug-url-propiedad" {...register("slug")} />
        {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Precio" type="number" {...register("price")} />
        {errors.price && <p className="text-destructive text-sm mt-1">{errors.price.message as string}</p>}
      </div>
      <div>
        <Input placeholder="Descripción" {...register("description")} />
      </div>
      <div>
        <Input placeholder="Dirección" {...register("address")} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Input placeholder="Recámaras" type="number" {...register("beds")} />
        </div>
        <div>
          <Input placeholder="Baños" type="number" {...register("baths")} />
        </div>
        <div>
          <Input placeholder="Área (m²)" type="number" {...register("sqft")} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Imágenes (URLs)</label>
        <div className="flex gap-2">
          <Input
            placeholder="https://ejemplo.com/imagen.jpg"
            value={newImageUrl}
            onChange={e => setNewImageUrl(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addImageUrl() } }}
          />
          <Button type="button" variant="outline" onClick={addImageUrl}>
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        {imageUrls.length > 0 && (
          <div className="space-y-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <img src={url} alt="" className="h-10 w-10 rounded object-cover" />
                <span className="truncate flex-1 text-muted-foreground">{url}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeImageUrl(i)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
