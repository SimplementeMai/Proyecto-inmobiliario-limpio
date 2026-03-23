"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Slider } from "@/app/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Settings2, MapPin, Plus, Minus, Pool, Dumbbell, ParkingCircle, Snowflake, Wifi, Palmtree, ArrowRight } from "lucide-react"

const amenitiesList = [
  { id: "pool", label: "Swimming Pool", icon: Pool },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "parking", label: "Parking", icon: ParkingCircle },
  { id: "ac", label: "Air Conditioning", icon: Snowflake },
  { id: "wifi", label: "High-speed Wifi", icon: Wifi },
  { id: "patio", label: "Patio / Terrace", icon: Palmtree },
]

export function FiltersModal() {
  const [priceRange, setPriceRange] = React.useState([1200000, 4500000])
  const [beds, setBeds] = React.useState(3)
  const [baths, setBaths] = React.useState(2)
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(["pool", "wifi"])

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const clearAll = () => {
    setPriceRange([1200000, 4500000])
    setBeds(3)
    setBaths(2)
    setSelectedAmenities([])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-8 py-6 border-b bg-background sticky top-0 z-10">
          <DialogTitle className="text-2xl font-bold tracking-tight">Filters</DialogTitle>
        </DialogHeader>
        
        <div className="p-8 space-y-10">
          {/* Section 1: Location */}
          <section>
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-4">Location</h3>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-12 h-14 bg-muted/30 border-none rounded-xl text-base" 
                placeholder="City, neighborhood, or address" 
                defaultValue="San Francisco, CA"
              />
            </div>
          </section>
          
          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Price Range</h3>
              <span className="text-sm font-bold text-primary">
                ${(priceRange[0] / 1000000).toFixed(1)}M – ${(priceRange[1] / 1000000).toFixed(1)}M
              </span>
            </div>
            
            <div className="px-2 mb-8">
              <Slider
                value={priceRange}
                max={10000000}
                step={100000}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 bg-muted/30 p-4 rounded-xl">
                <label className="text-[10px] text-muted-foreground uppercase font-black">Min Price</label>
                <div className="flex items-center text-base font-bold">
                  <span className="text-muted-foreground mr-1">$</span>
                  <input 
                    className="bg-transparent border-none p-0 focus:ring-0 w-full" 
                    value={priceRange[0].toLocaleString()}
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-1.5 bg-muted/30 p-4 rounded-xl">
                <label className="text-[10px] text-muted-foreground uppercase font-black">Max Price</label>
                <div className="flex items-center text-base font-bold">
                  <span className="text-muted-foreground mr-1">$</span>
                  <input 
                    className="bg-transparent border-none p-0 focus:ring-0 w-full" 
                    value={priceRange[1].toLocaleString()}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Property Type</h3>
              <Select defaultValue="house">
                <SelectTrigger className="bg-muted/30 border-none h-14 rounded-xl px-4 text-base font-medium">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-5">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Rooms</h3>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Bedrooms</span>
                <div className="flex items-center gap-4 bg-muted/30 rounded-full p-1.5">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-background shadow-sm hover:text-primary"
                    onClick={() => setBeds(Math.max(0, beds - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-black w-6 text-center">{beds}+</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-background shadow-sm text-primary hover:bg-primary hover:text-white"
                    onClick={() => setBeds(beds + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Bathrooms</span>
                <div className="flex items-center gap-4 bg-muted/30 rounded-full p-1.5">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-background shadow-sm hover:text-primary"
                    onClick={() => setBaths(Math.max(0, baths - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-black w-6 text-center">{baths}+</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-background shadow-sm text-primary hover:bg-primary hover:text-white"
                    onClick={() => setBaths(baths + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities */}
          <section>
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-5">Amenities & Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesList.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.id)
                const Icon = amenity.icon
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 text-sm font-bold transition-all relative",
                      isSelected 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-muted bg-background text-muted-foreground hover:border-muted-foreground/20"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                    {amenity.label}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full shadow-sm" />
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        <DialogFooter className="px-8 py-6 border-t bg-background sticky bottom-0 z-10 flex items-center justify-between sm:justify-between">
          <Button 
            variant="link" 
            className="text-sm font-bold text-muted-foreground hover:text-foreground"
            onClick={clearAll}
          >
            Clear all filters
          </Button>
          <Button className="h-14 px-10 rounded-xl font-bold text-base gap-2">
            Show 124 Homes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
