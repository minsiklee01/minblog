'use client'

import { Post } from '@prisma/client'
import Link from 'next/link'

export default function Drafts({
  drafts,
}: {
  drafts: Post[]
}) {
  let list = (
    <ul>
      {drafts.map((draft) => (
        <div key={draft.id}>
          <Link href={`/blog/draft/${draft.slug}`}>{draft.title}</Link>
        </div>
      ))}
    </ul>
  )

  if (drafts.length === 0) {
    list = <p>No draft exists.</p>
  }

  return (
    list
  )
}