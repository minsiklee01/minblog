'use client'

import { useSession } from '../context/SessionContext'
import Link from 'next/link'

export default function AddButtonIfLoggedIn() {
  const session = useSession()

  let action = (
    <span></span>
  )

  if (session) {
    action = (
      <div className='flex justify-end space-x-4'>
        <Link href={'/blog/add'}>Add Post</Link>
        <Link href={'/blog/add'}>My Drafts</Link>
      </div>
    )
  }
  return (
    action
  )
  
}