'use client'
import { supabase } from '@/../lib/supabaseClient'

export default function GitHubLogin() {

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  return <button onClick={handleLogin}>Login</button>
}