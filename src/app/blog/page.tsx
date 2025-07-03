import  AddButtonIfLoggedIn from '@/components/BlogAction'
import prisma from '../../../lib/prisma'
import { createClient } from '@/utils/supabase/server'
import CategoryTabs from '../ui/CategoryTabs'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const feed = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { categories: true }
  })
  const categories = await prisma.category.findMany()

  return (
    <div>
      {user && <AddButtonIfLoggedIn />}
      <CategoryTabs posts={feed} categories={categories} />
        {/* {feed.map((post) => (
          <div key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        ))} */}
    </div>
  )
}
