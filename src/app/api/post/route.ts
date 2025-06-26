import prisma from "@/../lib/prisma"
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, slug, content, category, published } = await req.json()

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      published,
      categories: { 
        connectOrCreate: category.map((name: string) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  })

  return NextResponse.json(post)
}

export function getDrafts() {
  return prisma.post.findMany({
    where: { published: false},
  })
}