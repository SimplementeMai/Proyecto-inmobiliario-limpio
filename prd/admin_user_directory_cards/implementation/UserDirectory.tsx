import * as React from "react"
import { UserCard } from "./UserCard"

interface User {
  name: string
  email: string
  status: "active" | "pending"
}

export function UserDirectory({ users }: { users: User[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
    </div>
  )
}
