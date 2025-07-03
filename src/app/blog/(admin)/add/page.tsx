import prisma from '@/../lib/prisma'
import PostForm from '@/app/ui/form';

export default async function AddPost() {

  const categories = await prisma.category.findMany()
  return(
    <PostForm categories={categories}/>
  )
}