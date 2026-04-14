import { PropertyForm } from "./PropertyForm"
import { ImageUploader } from "./ImageUploader"

export default function AddEditPropertyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>
      <div className="space-y-8">
        <ImageUploader onUpload={(files) => console.log(files)} />
        <PropertyForm />
      </div>
    </main>
  )
}
