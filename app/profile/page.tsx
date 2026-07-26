"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserProfileForm } from "./UserProfileForm"
import { SecuritySettings } from "./SecuritySettings"
import { ProfileAvatar } from "./ProfileAvatar"
import { supabase } from "@/lib/supabase/client"
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

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth")
      } else {
        setUser(user)

        let { data: clienteData } = await supabase
          .from('clientes')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()

        // Si no existe registro en clientes, crearlo
        if (!clienteData) {
          const { data: newCliente } = await supabase
            .from('clientes')
            .insert({
              nombre: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
              email: user.email || '',
              user_id: user.id,
              password: '',
            })
            .select('*')
            .single()
          clienteData = newCliente
        }

        setCliente(clienteData)
      }
      setLoading(false)
    }
    getUser()
  }, [router])

  if (loading) return <div className="container mx-auto px-4 py-12">Cargando...</div>

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Perfil de Usuario</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-card p-6 rounded-xl border flex flex-col items-center shadow-sm">
          {console.log("Datos del cliente:", cliente)}
          <ProfileAvatar src={cliente?.avatar_url || ""} alt="Profile" />
          <h2 className="mt-4 font-bold text-lg">{cliente?.nombre || user?.user_metadata?.full_name || "Usuario"}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Información Personal</h2>
            <UserProfileForm user={user} cliente={cliente} onRefresh={async () => {
              if (user) {
                const { data } = await supabase.from('clientes').select('*').eq('user_id', user.id).maybeSingle()
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
