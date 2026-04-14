"use client"

import * as React from "react"
import { cn } from "@/lib/utils" // Utility for conditional class names
import { Button } from "@/app/components/ui/button" // shadcn/ui button

interface Category {
  id: string
  label: string
}

interface CategoryBarProps {
  categories: Category[]
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryBar({ categories, activeId, onSelect }: CategoryBarProps) {
  return (
    // Added 'no-scrollbar' class for cleaner UI if needed, assuming it's defined in Tailwind config
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeId === category.id ? "default" : "outline"}
          className={cn(
            "rounded-full px-6 py-2 transition-all text-base font-medium", // Basic styling
            activeId === category.id
              ? "bg-primary text-primary-foreground hover:bg-primary/90" // Active state styling
              : "hover:bg-muted" // Inactive state hover styling
          )}
          onClick={() => onSelect(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
