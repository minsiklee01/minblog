'use client';

import { useState, useEffect, useRef } from 'react';
import { Post, Category } from '@prisma/client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Link from 'next/link';

type FormProps = {
  post?: Post & { categories: { id: number; name: string }[] }, 
  categories: Category[]
}

export default function PostForm({ post, categories }: FormProps ) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('All');
  const [markdown, setMarkdown] = useState("")
  const previewRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (post) {
    setTitle(post.title);
    setContent(post.content);
    if (post.categories.length > 0) {
      setCategory(post.categories[0].name);
    }
  } else {
    setCategory(categories[0]?.name || '');
  }
}, [post, categories]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdown(value);
    setContent(value);
    scrollPreviewToBottom();
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

  const scrollPreviewToBottom = () => {
    const div = previewRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  };

  return (
    <div className="flex w-full h-dvh">
      <form 
        onSubmit={e => handleSubmit(e,false)}
        className="w-1/2 flex flex-col gap-3 p-6 h-full"
      >
        <h1>{post ? 'Edit Post' : 'New Draft'}</h1>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input 
          type="text" 
          placeholder="Title" 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
          className='h-1/12 text-3xl'
          />
        <Textarea 
          placeholder="Enter content here." 
          value={content}
          onChange={handleInput}
          className="flex-1 resize-none"
        />
        <div className="flex justify-between">
          <Link href='/blog' className='text-red-600'>Cancel</Link>
          <div className='flex gap-3'>
            <button
              type="button"
              disabled={!content || !title}
              onClick={(e) => handleSubmit(e, true)}
            >Save Draft</button>
            <input 
              disabled={!content || !title || !category} 
              type="submit" 
              value={post ? 'Update' : 'Create'} 
              className={`${!content || !title || !category
                ? 'text-gray-600 cursor-not-allowed'
                : 'hover:text-blue-600'
              }`}
            />
          </div>
        </div>
      </form>
      <div 
        ref={previewRef}
        className="w-1/2 p-4 h-full overflow-auto bg-gray-100"
      >
        <span className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </span>
      </div>
    </div>
  );
}