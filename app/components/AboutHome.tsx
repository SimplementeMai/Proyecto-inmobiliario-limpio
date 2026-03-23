import * as React from "react"
import { CheckCircle2 } from "lucide-react"

interface AboutHomeProps {
  description: string
  amenities: string[]
}

export function AboutHome({ description, amenities }: AboutHomeProps) {
  return (
    <div className="space-y-8 p-8 bg-card rounded-xl border border-border/40 shadow-sm">
      <div>
        <h2 className="text-xl font-bold mb-4">About this home</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
