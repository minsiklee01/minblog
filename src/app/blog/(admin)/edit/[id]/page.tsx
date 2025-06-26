import prisma from '@/../lib/prisma'
import PostForm from '@/app/ui/form';

export default async function EditPost({ params }: { params: { id: string }}) {

  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    return <div>Invalid ID</div>;
  }

  const post = await prisma.post.findUnique({
    where: { id: id },
    include: { categories: true }
  })

  if (!post) {
    console.error('Post not found');
    return <div>Post not found</div>;
  }

  return(
    <PostForm post={post} />
  )
}