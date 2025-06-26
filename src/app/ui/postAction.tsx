'use client'
import { useSession } from "@/context/SessionContext"
import { useRouter } from 'next/navigation'

export default function PostAction({ postId }: { postId: number }) {
  const session = useSession()
  const router = useRouter()

  if(!session) return null
  if(session.user.email !== 'leeminsik999@gmail.com') return null

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