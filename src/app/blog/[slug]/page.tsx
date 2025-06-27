import { createClient } from '@/utils/supabase/server'
import prisma from '@/../lib/prisma'
import PostAction from '@/app/ui/postAction'
import ReactMarkdown from 'react-markdown'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage(props: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  })

  if (!post) {
    return <div>404: Page Not Found</div>
  }
  return (
    <article>
      { user && <PostAction postId = {post.id}/>}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown >
          {post.content}
        </ReactMarkdown>
      </article>
    </article>
  )
}