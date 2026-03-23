import * as React from "react"
import { Upload } from "lucide-react"

interface ImageUploaderProps {
  onUpload: (files: File[]) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(Array.from(e.target.files))
    }
  }

  return (
    <div className="border-2 border-dashed border-border p-8 rounded-xl text-center cursor-pointer hover:border-primary transition-colors">
      <input 
        type="file" 
        multiple 
        className="hidden" 
        id="file-upload" 
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer space-y-2">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">Drag & drop or click to upload</p>
      </label>
    </div>
  )
}
