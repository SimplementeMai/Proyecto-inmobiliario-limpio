"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserProfileForm } from "./UserProfileForm"
import { SecuritySettings } from "./SecuritySettings"
import { ProfileAvatar } from "./ProfileAvatar"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

interface Cliente {
  id_cliente: number
  nombre: string
  email: string
  user_id: string | null
}

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth")
      } else {
        setUser(user)
        const { data: clienteData } = await supabase
          .from('Clientes')
          .select('*')
          .eq('user_id', user.id)
          .single()
        setCliente(clienteData)
      }
      setLoading(false)
    }
    getUser()
  }, [router, supabase.auth])

  if (loading) return <div className="container mx-auto px-4 py-12">Cargando...</div>

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Perfil de Usuario</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-card p-6 rounded-xl border flex flex-col items-center shadow-sm">
            <ProfileAvatar src={user?.user_metadata?.avatar_url} alt="Profile" />
            <h2 className="mt-4 font-bold text-lg">{cliente?.nombre || user?.user_metadata?.full_name || "Usuario"}</h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Información Personal</h2>
            <UserProfileForm user={user} cliente={cliente} onRefresh={async () => {
              if (user) {
                const { data } = await supabase.from('Clientes').select('*').eq('user_id', user.id).single()
                setCliente(data)
              }
            }} />
          </section>

          <section className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Configuración de Seguridad</h2>
            <SecuritySettings />
          </section>
        </div>
      </div>
    </main>
  )
}
