import Drafts from '@/app/ui/drafts'
import { Suspense } from 'react'

export default async function Draft() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/post/drafts`, {
      cache: 'no-store',
    })
  const drafts = await res.json()

  return(
    <Suspense fallback={<p>Loading ...</p>}>
      <Drafts drafts={drafts}/>
    </Suspense>
  )
}