import LoginForm from './loginForm'
import LogoutButton from './logoutButton'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
   
  if (error || !data?.user) {
    return <LoginForm />
  }
  
  return (
    <LogoutButton />
  )
}
