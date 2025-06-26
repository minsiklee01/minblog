import Drafts from '@/app/ui/drafts'
import { getDrafts } from '@/app/api/post/route'
import { Suspense } from 'react'

export default function Draft() {
  const drafts = getDrafts()

  return(
    <Suspense fallback={<p>Loading ...</p>}>
      <Drafts drafts={drafts}/>
    </Suspense>
  )
}