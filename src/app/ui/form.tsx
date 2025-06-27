'use client';

import { useState, useEffect } from 'react';
import { Post, Category } from '@prisma/client';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

type PostWithCategories = Post & { categories: Category[] };

export default function PostForm({ post }: { post?: PostWithCategories }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState("")

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.categories.map((c) => c.name));
    }
  }, [post]);

const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const value = e.target.value;
  setMarkdown(value);
  setContent(value);
}

  async function handleSubmit(e: React.FormEvent, isDraft: boolean) {
    e.preventDefault();
    if (!post) {
      // POST
      const body = { 
        title, 
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        category,
        published: !isDraft,
      };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      // PUT
      const payload = { title, content, category, published: !isDraft };
      await fetch(`/api/post/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    window.location.href = '/blog';
  }

  return (
    <div className="flex h-[600px]">
      <form 
        onSubmit={e => handleSubmit(e,false)}
        className="w-1/2 p-4 border overflow-auto flex flex-col gap-2"
      >
        <h1>{post ? 'Edit Post' : 'New Draft'}</h1>
        <select
          value={category}
          multiple
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(Array.from(e.target.selectedOptions, option => option.value))
          }
        >
          <option value="all">All</option>
          <option value="test">Test</option>
        </select>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          type='text'
          className='border-2 border-solid'
          value={title}
        />
        <textarea
          onChange={handleInput}
          placeholder='Content'
          rows={8}
          value={content}
          className='border-2 border-solid'
        />
        <div className="flex gap-2">
          <input disabled={!content || !title} type="submit" value={post ? 'Update' : 'Create'} />
          <button
            type="button"
            disabled={!content || !title}
            onClick={(e) => handleSubmit(e, true)}
          >Save Draft</button>
        </div>
        <Link href='/blog'>Cancel</Link>
      </form>
      <div className="w-1/2 p-4 border overflow-auto prose h-full ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}