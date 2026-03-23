import * as React from "react"
import { Card, CardContent } from "@/app/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: string
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="p-5 flex items-center justify-between border-primary/10 shadow-sm">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <span className="material-icons text-xl">{icon}</span>
      </div>
    </Card>
  )
}
