import * as React from "react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2">
        <Link href="/dashboard/nueva">
          <Button>Agregar Propiedad</Button>
        </Link>
      </div>
    </div>
  )
}
