'use client'

import { useRouter } from 'next/navigation'
import { Post } from '@prisma/client'
import PostAction from './postAction'
import ReactMarkdown from 'react-markdown'

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
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}