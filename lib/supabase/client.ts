import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

// Singleton instance to prevent multiple client initializations and auth lock race conditions
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
