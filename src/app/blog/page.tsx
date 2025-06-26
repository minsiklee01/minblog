import  AddButtonIfLoggedIn from '@/components/BlogAction'
import prisma from '../../../lib/prisma'
import Link from 'next/link'

export default async function Page() {
  const feed = await prisma.post.findMany({
    where: { published: true },
  })

  return (
    <div>
      <AddButtonIfLoggedIn />
      <div>
        {feed.map((post) => (
          <div key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
