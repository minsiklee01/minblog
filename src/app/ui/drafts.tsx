'use client'

import { use } from 'react'
import { Post } from '@prisma/client'
import Link from 'next/link'

export default function Drafts({
  drafts,
}: {
  drafts: Promise<Post[]>
}) {
  const allDrafts = use(drafts)

  let list = (
    <ul>
      {allDrafts.map((draft) => (
        <div key={draft.id}>
          <Link href={`/blog/draft/${draft.slug}`}>{draft.title}</Link>
        </div>
      ))}
    </ul>
  )

  if (allDrafts.length === 0) {
    list = <p>No draft exists.</p>
  }

  return (
    list
  )
}