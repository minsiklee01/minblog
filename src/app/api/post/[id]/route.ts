import prisma from '@/../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) { 
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid ID'}, { status: 400 });
  }

  const deleted = await prisma.post.delete({
    where: {id:postId},
  })

  return NextResponse.json(deleted);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const { title, slug, content, category, published } = await req.json();

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      slug,
      content,
      published,
      categories: {
        set: [],
        connectOrCreate: category.map((name: string) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });

  return NextResponse.json(updatedPost);
}