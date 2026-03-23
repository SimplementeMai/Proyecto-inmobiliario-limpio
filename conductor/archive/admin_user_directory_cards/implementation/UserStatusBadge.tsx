import * as React from "react"
import { Badge } from "@/app/components/ui/badge"
import { cn } from "@/lib/utils"

interface UserStatusBadgeProps {
  status: "active" | "pending"
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <Badge 
      variant={status === "active" ? "default" : "secondary"}
      className={cn(
        "rounded-full px-3 py-1 font-medium uppercase text-[10px] tracking-wider",
        status === "active" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
      )}
    >
      {status}
    </Badge>
  )
}
