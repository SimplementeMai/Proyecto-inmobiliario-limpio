import { useEffect, useState } from 'react'
import { useAuth } from '@/app/components/AuthContext'

export function useAdmin() {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    
    // Verificamos el rol guardado en la metadata del usuario
    const role = user?.app_metadata?.role
    setIsAdmin(role === 'admin')
    setLoading(false)
  }, [user, authLoading])

  return { isAdmin, loading }
}
