import prisma from '@/../lib/prisma'
import PostAction from '@/app/ui/postAction'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  })

  if (!post) {
    return <div>404: Page Not Found</div>
  }
  return (
    <article>
      <PostAction postId = {post.id} />
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}