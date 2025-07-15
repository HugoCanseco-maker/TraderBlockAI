// frontend/lib/supabase.ts

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnon) {
    throw new Error('Supabase environment variables are not set')
}

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnon
)
