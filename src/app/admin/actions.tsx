'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// export async function signup(formData: FormData) {
//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const supabase = await createClient()
//   const logindata = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { data, error } = await supabase.auth.signUp(logindata)

//   if (error || !data.user) {
//     console.log(error || 'No user returned')
//     redirect('/error')
//   }
//   console.log(data.user)
//   revalidatePath('/', 'layout')
//   redirect('/')
// }

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}