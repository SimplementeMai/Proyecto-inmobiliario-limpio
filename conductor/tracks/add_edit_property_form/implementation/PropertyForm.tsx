"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { supabase } from "@/lib/supabase/client"
import { Loader2, Upload, X, ImageIcon } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio").regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  price: z.string().min(1, "El precio es obligatorio"),
  description: z.string().optional(),
  tipo: z.enum(["venta", "renta"], { required_error: "Selecciona venta o renta" }),
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
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

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

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `property-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file)

      if (uploadError) {
        setError(`Error al subir "${file.name}": ${uploadError.message}`)
        setUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName)

      if (urlData?.publicUrl) {
        setImageUrls(prev => [...prev, urlData.publicUrl])
      }
    }

    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const { data: { user } } = await supabase.auth.getUser()

    const propertyData = {
      title: data.title,
      slug: data.slug,
      price: Number(data.price),
      description: data.description || null,
      tipo: data.tipo,
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
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" value="venta" {...register("tipo")} />
          Venta
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="renta" {...register("tipo")} />
          Renta
        </label>
        {errors.tipo && <p className="text-destructive text-sm mt-1">{errors.tipo.message as string}</p>}
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
        <label className="text-sm font-medium">Imágenes</label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
          {uploading ? "Subiendo imágenes..." : "Importar imágenes desde tu equipo"}
        </Button>

        <div className="flex gap-2">
          <Input
            placeholder="O pega una URL de imagen"
            value={newImageUrl}
            onChange={e => setNewImageUrl(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addImageUrl() } }}
          />
          <Button type="button" variant="outline" onClick={addImageUrl}>
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        {imageUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt=""
                  className="h-24 w-full rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23999' font-size='12'%3EError%3C/text%3E%3C/svg%3E"
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImageUrl(i)}
                >
                  <X className="h-3 w-3" />
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
