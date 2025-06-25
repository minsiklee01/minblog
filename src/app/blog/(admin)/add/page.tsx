'use client'
import React, { useState } from 'react';
import Link from 'next/link'

export default function AddPost() {
  const [title,setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string[]>(['All']);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { 
        title, 
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        category,
        published: true,
      };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error);
    }
  }
  return(
    <div>
      <form onSubmit={submit}>
        <h1>New Draft</h1>
        <select 
          value={category}
          multiple
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(Array.from(e.target.selectedOptions, option => option.value))
          }
        >
          <option value="all">All</option>
        </select>
        <input
          autoFocus
          onChange={(e)=>setTitle(e.target.value)}
          placeholder='Title'
          type='text'
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e)=>setContent(e.target.value)}
          placeholder='Content'
          rows={8}
          value={content}
          className='border-2 border-solid'
        />
        <input disabled={!content || !title} type="submit" value="Create" />
      </form>
      <Link href='/blog'>Cancel</Link>
    </div>
  )
}