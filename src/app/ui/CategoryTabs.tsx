'use client'

import { useState } from 'react'
import { Post } from '@prisma/client';
import Link from 'next/link'

type PostWithCategories = Post & {
  categories: { id: number; name: string }[]
}

export default function CategoryTabs({ categories, posts }: {
  categories: { id: number; name: string }[],
  posts: PostWithCategories[]
}) {
  const [active, setActive] = useState<number | null>(null)

  const filteredPosts = active === null
    ? posts
    : posts.filter(post => post.categories.some(c => c.id === active))

  return (
    <div>
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActive(null)}
          className={`pb-2 ${active === null ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActive(category.id)}
            className={`pb-2 ${active === category.id ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {filteredPosts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="border-b p-4 cursor-pointer hover:bg-gray-50">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}