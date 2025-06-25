'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
const SessionContext = createContext<Session | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode}) {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session && session.user.email !== 'leeminsik999@gmail.com') {
        await supabase.auth.signOut()
        router.replace('/')
        router.refresh()
        return
      }

      setSession(session)

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }

    initSession()
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
} 

export const useSession = () => useContext(SessionContext)