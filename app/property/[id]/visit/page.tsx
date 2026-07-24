import { VisitBookingForm } from "@/app/components/VisitBookingForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export default async function VisitBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="container mx-auto px-4 py-12 max-w-xl">
      <Link href={`/property/${id}`}>
        <Button variant="ghost" className="mb-6 -ml-2 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a la propiedad
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-8">Schedule a Visit</h1>
      <div className="bg-card p-8 rounded-xl border shadow-sm">
        <VisitBookingForm propertyId={id} />
      </div>
    </main>
  )
}
