import Link from "next/link"

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Propiedad no encontrada</h2>
      <p className="text-muted-foreground mb-8">
        La propiedad que buscas no existe o no está disponible.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
