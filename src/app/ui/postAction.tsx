'use client'
import { useRouter } from 'next/navigation'

export default function PostAction({ postId }: { postId: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    await fetch(`/api/post/${postId}`, { method: 'DELETE'})
    router.push('/blog')
  } 

  return (
    <div className="flex justify-end gap-4">
      <button onClick={()=> router.push(`/blog/edit/${postId}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}