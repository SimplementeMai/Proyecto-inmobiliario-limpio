import { VisitBookingForm } from "@/app/components/VisitBookingForm"

export default function VisitBookingPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-12 max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Schedule a Visit</h1>
      <div className="bg-card p-8 rounded-xl border shadow-sm">
        <VisitBookingForm propertyId={params.id} />
      </div>
    </main>
  )
}
