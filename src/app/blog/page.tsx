import  AddButtonIfLoggedIn from '@/components/AddButtonIfLoggedIn'
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
          <Link key={post.id} href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
