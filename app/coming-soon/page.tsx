import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function ComingSoonPage() {
  return (
    <main className="container mx-auto px-4 py-20 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Feature Coming Soon</h1>
      <p className="text-xl text-muted-foreground max-w-lg mx-auto">
        We&apos;re working hard to bring you the best property management experience. This feature will be available shortly.
      </p>
      <Link href="/">
        <Button size="lg" className="mt-8">Back to Home</Button>
      </Link>
    </main>
  )
}
