import { createClient } from '@/utils/supabase/server'
import prisma from '@/../lib/prisma'
import PostAction from '@/app/ui/postAction'
import ReactMarkdown from 'react-markdown'

export default async function BlogPostPage( props : { params: Promise<{ slug: string}>}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { slug: encodedSlug } = await props.params;
  const slug = decodeURIComponent(encodedSlug)

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: true,
    }
  })

  if (!post) {
    return <div>404: Page Not Found</div>
  }
  return (
    <article>
      <header className='flex justify-between'>
        <p className='text-gray-600'>{post.categories[0].name}</p>
        { user && <PostAction postId = {post.id}/>}
      </header>
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown >
          {post.content}
        </ReactMarkdown>
      </article>
    </article>
  )
}