import * as React from "react"
import { Separator } from "@/app/components/ui/separator"

interface Feature {
  label: string
  value: string
}

export function PropertyFeatures({ features }: { features: Feature[] }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Key Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={feature.label} className="flex items-center justify-between sm:block">
            <span className="text-sm text-muted-foreground">{feature.label}</span>
            <span className="text-xl font-bold">{feature.value}</span>
            {index < features.length - 1 && <Separator className="hidden sm:block mt-4" />}
          </div>
        ))}
      </div>
    </div>
  )
}
