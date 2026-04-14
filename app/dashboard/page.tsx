import { StatCard } from "@/app/components/StatCard"
import { DashboardHeader } from "@/app/components/DashboardHeader"
import { PropertyTable } from "@/app/components/PropertyTable"

export default function DashboardPage() {
  const properties = [
    { title: 'The Glass Pavilion', location: 'Beverly Hills, CA', price: 5250000, status: 'Active' as const },
    { title: 'Modern Lakeside Manor', location: 'Willow Creek Rd, Aspen', price: 2100000, status: 'Active' as const },
    { title: 'Sunset Apartments', location: '88 Ocean Blvd, Miami', price: 850000, status: 'Pending' as const },
    { title: 'Industrial Skyline Loft', location: 'Evergreen Terrace, Seattle', price: 1250000, status: 'Active' as const },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      <DashboardHeader title="My Properties" />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Listings" value="24" icon="apartment" />
        <StatCard title="Active Properties" value="18" icon="check_circle" />
        <StatCard title="Pending Sale" value="4" icon="pending" />
      </div>

      <PropertyTable properties={properties} />
    </main>
  )
}
