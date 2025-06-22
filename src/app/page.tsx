import Head from 'next/head'
import './global.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Minsik&apos;s Portfolio</title>
        <meta name="description" content="Minsik Lee's personal portfolio and blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hello, I&apos;m Minsik 👋
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to my portfolio and blog!
        </p>
        <Link href={`/blog`}>Blog</Link>
      </main>
    </>
  )
}