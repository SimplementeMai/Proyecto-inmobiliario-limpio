import * as React from "react"
import { Heart } from "lucide-react"

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-muted p-4 rounded-full mb-4">
        <Heart className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{message}</h3>
    </div>
  )
}
