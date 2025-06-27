import  AddButtonIfLoggedIn from '@/components/BlogAction'
import prisma from '../../../lib/prisma'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const feed = await prisma.post.findMany({
    where: { published: true },
  })

  return (
    <div>
      {user && <AddButtonIfLoggedIn />}
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
