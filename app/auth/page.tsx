import { LoginForm } from "@/app/components/LoginForm"
import { RegistrationForm } from "@/app/components/RegistrationForm"

export default function AuthPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-lg space-y-12">
      <section className="bg-card p-8 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <LoginForm />
      </section>

      <section className="bg-card p-8 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <RegistrationForm />
      </section>
    </main>
  )
}
