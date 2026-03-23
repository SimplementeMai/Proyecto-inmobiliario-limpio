import { UserDirectory } from "@/app/components/UserDirectory"

export default function AdminUsersPage() {
  const users = [
    { name: 'Jane Doe', email: 'jane@example.com', status: 'active' as const },
    { name: 'John Smith', email: 'john@example.com', status: 'pending' as const },
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'active' as const },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">User Directory</h1>
      <UserDirectory users={users} />
    </main>
  )
}
