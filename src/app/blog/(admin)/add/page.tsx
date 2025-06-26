'use client'
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import Link from 'next/link'
import PostForm from '@/app/ui/form';

export default function AddPost() {
  // const [title,setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [category, setCategory] = useState<string[]>(['All']);

  // const router = useRouter();

  // const submit = async (e: React.SyntheticEvent, isDraft: boolean) => {
  //   e.preventDefault();
  //   try {
  //     const body = { 
  //       title, 
  //       slug: title.toLowerCase().replace(/\s+/g, '-'),
  //       content,
  //       category,
  //       published: !isDraft,
  //     };
  //     await fetch('/api/post', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(body),
  //     })
  //     router.push('/blog')
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  return(
    <PostForm />
    // <div>
    //   <form onSubmit={(e) => submit(e,false)}>
    //     <h1>New Draft</h1>
    //     <select 
    //       value={category}
    //       multiple
    //       onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    //         setCategory(Array.from(e.target.selectedOptions, option => option.value))
    //       }
    //     >
    //       <option value="all">All</option>
    //       <option value="test">Test</option>
    //     </select>
    //     <br/>
    //     <input
    //       autoFocus
    //       onChange={(e)=>setTitle(e.target.value)}
    //       placeholder='Title'
    //       type='text'
    //       className='border-2 border-solid'
    //       value={title}
    //     /><br/>
    //     <textarea
    //       cols={50}
    //       onChange={(e)=>setContent(e.target.value)}
    //       placeholder='Content'
    //       rows={8}
    //       value={content}
    //       className='border-2 border-solid'
    //     /><br/>
    //     <input disabled={!content || !title} type="submit" value="Create" />
    //     <button
    //       type="button"
    //       // disabled={!content || !title}
    //       onClick={(e) => submit(e, true)}
    //     >
    //       Save Draft
    //     </button>
    //   </form>
    //   <Link href='/blog'>Cancel</Link>
    // </div>
  )
}