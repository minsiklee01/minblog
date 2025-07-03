import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Link href={'/'}> Home </Link>
        </div>

        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <p>Minsik</p>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}