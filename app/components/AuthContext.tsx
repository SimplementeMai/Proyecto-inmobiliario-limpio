"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = React.createContext<AuthContextType>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

      return () => {
        subscription.unsubscribe()
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}
