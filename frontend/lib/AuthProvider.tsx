'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Session, User } from '@supabase/supabase-js'

import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

type SupabaseContext = {
  user: User | null
}

const Context = createContext<SupabaseContext>({ user: null })

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user ?? null)
    }

    fetchUser()

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event: any, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <Context.Provider value={{ user }}>{children}</Context.Provider>
}

export const useSupabase = () => useContext(Context)
