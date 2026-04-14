import { VisitBookingForm } from "@/app/components/VisitBookingForm"

export default async function VisitBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="container mx-auto px-4 py-12 max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Schedule a Visit</h1>
      <div className="bg-card p-8 rounded-xl border shadow-sm">
        <VisitBookingForm propertyId={id} />
      </div>
    </main>
  )
}
