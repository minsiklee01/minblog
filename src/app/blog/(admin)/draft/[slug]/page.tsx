import prisma from '@/../lib/prisma'
import DraftClient from '@/app/ui/draftClient'

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DraftPage({ params }: Props) {

  const { slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug)

  const post = await prisma.post.findUnique({
    where: { slug: slug }
  })

  if (!post) {
    return <div>404: Page Not Found</div>
  }

  return <DraftClient post={post} />
  
}