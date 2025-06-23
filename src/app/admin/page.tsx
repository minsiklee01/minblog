'use client'

import GitHubLogin from "@/components/GitHubLogin"
import { supabase } from '@/../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useSession } from '@/context/SessionContext'

export default function Page() {
  const router = useRouter()
  const session = useSession()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }


  return (
    <div>
      {session ? (
        <div>
          <p>Welcome, admin!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <GitHubLogin />
      )}
    </div>
  )
}