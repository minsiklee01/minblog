'use client'


import { useRouter } from 'next/navigation'
import { Post } from '@prisma/client'

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
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      <button onClick={() => publishPost(post.id)}>Publish</button>
    </div>
  )
}