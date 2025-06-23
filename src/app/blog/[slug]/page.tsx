import prisma from '@/../lib/prisma'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  })

  if (!post) {
    return <div>404: Page Not Found</div>
  }
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}