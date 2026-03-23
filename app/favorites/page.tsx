import { FavoritesList } from "@/app/components/FavoritesList"

export default function FavoritesPage() {
  const favorites = [
    { title: 'Luxury Apartment', price: 850000, imageUrl: '/prop1.jpg' },
    { title: 'Modern Villa', price: 1200000, imageUrl: '/prop2.jpg' },
  ]

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <FavoritesList properties={favorites} />
    </main>
  )
}
