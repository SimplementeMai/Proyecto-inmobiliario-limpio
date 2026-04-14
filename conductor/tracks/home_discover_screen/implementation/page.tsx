import { HeroSearch } from "@/app/components/HeroSearch"
import { CategoryBar } from "@/app/components/CategoryBar"
import { PropertyCard } from "@/app/components/PropertyCard"

export default function HomeDiscover() {
  const categories = [
    { id: 'houses', label: 'Houses' },
    { id: 'condos', label: 'Condos' },
    { id: 'apartments', label: 'Apartments' },
  ]

  const trendingProperties = [
    {
      price: 1500000,
      location: 'San Francisco, CA',
      beds: 3,
      baths: 2,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXOQNT51Cz2cPdTVGyr6DA9NmaizRJT_h-GpzTk043U9D4hotjpBSgVzGQJS89IeUQQm02p6F4tIoZA5ly5H32xJSyPNjt6Ru47JtGsLLkxA4g8nr1i8SQL1_DvRvS80MIv_JwWavbMeqZBMWVuWIEhli6Z_iX5Iof9X5fRJ13-FIkx7Olyn43SXE8eWTb1JXrZyT-KKsb8KED9SZM-Hm07NfNn8i2xxoejNDgbf31R4RrRv6f8S4wULTE5k2DByf1GulIeuJYhdU',
    },
    {
      price: 2200000,
      location: 'Los Angeles, CA',
      beds: 4,
      baths: 3,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXOQNT51Cz2cPdTVGyr6DA9NmaizRJT_h-GpzTk043U9D4hotjpBSgVzGQJS89IeUQQm02p6F4tIoZA5ly5H32xJSyPNjt6Ru47JtGsLLkxA4g8nr1i8SQL1_DvRvS80MIv_JwWavbMeqZBMWVuWIEhli6Z_iX5Iof9X5fRJ13-FIkx7Olyn43SXE8eWTb1JXrZyT-KKsb8KED9SZM-Hm07NfNn8i2xxoejNDgbf31R4RrRv6f8S4wULTE5k2DByf1GulIeuJYhdU',
    },
    {
      price: 1800000,
      location: 'Seattle, WA',
      beds: 2,
      baths: 2,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXOQNT51Cz2cPdTVGyr6DA9NmaizRJT_h-GpzTk043U9D4hotjpBSgVzGQJS89IeUQQm02p6F4tIoZA5ly5H32xJSyPNjt6Ru47JtGsLLkxA4g8nr1i8SQL1_DvRvS80MIv_JwWavbMeqZBMWVuWIEhli6Z_iX5Iof9X5fRJ13-FIkx7Olyn43SXE8eWTb1JXrZyT-KKsb8KED9SZM-Hm07NfNn8i2xxoejNDgbf31R4RrRv6f8S4wULTE5k2DByf1GulIeuJYhdU',
    }
  ]

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <HeroSearch />
      
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
        <CategoryBar categories={categories} activeId="houses" onSelect={() => {}} />
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Trending Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProperties.map((prop, i) => (
            <PropertyCard key={i} property={prop} />
          ))}
        </div>
      </section>
    </main>
  )
}
