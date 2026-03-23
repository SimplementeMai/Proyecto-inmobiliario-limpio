import { PropertyGallery } from "@/app/components/PropertyGallery"
import { PropertyHeader } from "@/app/components/PropertyHeader"
import { PropertyFeatures } from "@/app/components/PropertyFeatures"
import { AgentContact } from "@/app/components/AgentContact"
import { AboutHome } from "@/app/components/AboutHome"

export default function PropertyDetailsPage() {
  const property = {
    title: 'Modern Luxury Villa',
    price: 2500000,
    location: 'Beverly Hills, CA',
    beds: 4,
    baths: 3,
    sqft: 2400,
  }

  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjNDU9iE4zwPuWeg-CjIrLI-87GF24_LgOggcXT0vmUYfMx2q1dJAheiqWqVN-39uiwyLKEfP18FsG1vtUyAPX902OhGEfM4clcQiDsJW7MBbc_BoMtZXtqIeFKIfkHnkIPwmFbQg8Eaan6ULV99T8AUVUuKsro0HoTMrIaxw5pp1uSuQlF8X5Dait4US1W4vmyZnVioXbFnCoaOOZ0LPorb0rVGAIQd9reWcpqq27C0oO4ltnsCTHIcjIm0xp-2qVbRJSIZzWPv0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs'
  ]

  const features = [
    { label: 'Bedrooms', value: property.beds.toString() },
    { label: 'Bathrooms', value: property.baths.toString() },
    { label: 'Sqft', value: property.sqft.toLocaleString() },
  ]

  const agent = {
    name: 'Sarah Jenkins',
    role: 'Top Rated Agent',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w'
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <PropertyGallery images={images} />
          <PropertyHeader property={property} />
          <PropertyFeatures features={features} />
          <AboutHome 
            description="Experience modern luxury in this architecturally stunning home located in the heart of Palo Alto. Designed with an emphasis on indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light."
            amenities={['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'Electric Vehicle Charging']}
          />
        </div>
        <div className="lg:col-span-4">
          <AgentContact agent={agent} />
        </div>
      </div>
    </main>
  )
}
