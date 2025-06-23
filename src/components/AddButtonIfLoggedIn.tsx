'use client'

import { useSession } from '../context/SessionContext'

export default function AddButtonIfLoggedIn() {
  const session = useSession()
  
  return session ? <p>add</p> : null
}