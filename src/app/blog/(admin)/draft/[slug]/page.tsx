import prisma from '@/../lib/prisma'
import DraftClient from '@/app/ui/draftClient'

interface PageProps {
  params: { slug: string }
}

export default async function DraftPage({ params }: PageProps) {

  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug: slug }
  })

  if (!post) {
    return <div>404: Page Not Found</div>
  }

  return <DraftClient post={post} />
  
}