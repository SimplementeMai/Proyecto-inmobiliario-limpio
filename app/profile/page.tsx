import { UserProfileForm } from "@/app/components/UserProfileForm"
import { SecuritySettings } from "@/app/components/SecuritySettings"
import { ProfileAvatar } from "@/app/components/ProfileAvatar"

export default function UserProfilePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-card p-6 rounded-xl border flex flex-col items-center shadow-sm">
            <ProfileAvatar src="/user-avatar.jpg" alt="User Profile" />
            <h2 className="mt-4 font-bold text-lg">John Doe</h2>
            <p className="text-muted-foreground text-sm">john.doe@example.com</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <UserProfileForm />
          </section>

          <section className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Security Settings</h2>
            <SecuritySettings />
          </section>
        </div>
      </div>
    </main>
  )
}
