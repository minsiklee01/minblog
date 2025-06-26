'use client'

import { useRouter } from 'next/navigation'
import { Post } from '@prisma/client'
import PostAction from './postAction'

export default function DraftClient({ post }: { post: Post }) {
  const router = useRouter()

  async function publishPost(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: 'POST',
    })
    router.push('/blog')
  }

  return (
    <div>
      <div className="flex justify-end gap-4">
        <PostAction postId={post.id} />
        <button onClick={() => publishPost(post.id)}>Publish</button>
      </div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}