'use client'

import { logoutAction } from './actions'

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">log out</button>
    </form>
  )
}