import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkRole() {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Verificamos el rol guardado en la metadata del usuario
      const role = user?.app_metadata?.role
      setIsAdmin(role === 'admin')
      setLoading(false)
    }
    checkRole()
  }, [])

  return { isAdmin, loading }
}
