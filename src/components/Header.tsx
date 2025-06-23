'use client'
import Link from 'next/link'
import headerNavLinks from '@/data/headerNavLinks'

export default function Header () {

  return (
    <header className='flex items-center w-full bg-white justify-between py-10'>
      <div className='flex items-center space-x-4'>
        {headerNavLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            {link.title}
          </Link>
        ))}
      </div>
    </header>
  )
}