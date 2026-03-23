import * as React from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { UserStatusBadge } from "./UserStatusBadge"

interface User {
  name: string
  email: string
  status: "active" | "pending"
}

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <UserStatusBadge status={user.status} />
      </CardContent>
    </Card>
  )
}
