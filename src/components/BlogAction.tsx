'use client'

import Link from 'next/link'

export default function AddButtonIfLoggedIn() {
  return (
    <div className='flex justify-end space-x-4'>
      <Link href={'/blog/add'}>Add Post</Link>
      <Link href={'/blog/draft'}>My Drafts</Link>
    </div>
  )
}