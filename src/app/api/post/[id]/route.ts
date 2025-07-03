import prisma from '@/../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid ID'}, { status: 400 });
  }

  const deleted = await prisma.post.delete({
    where: {id:postId},
  })

  return NextResponse.json(deleted);
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const { title, content, category, published } = await req.json();

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      categories: {
        set: [],
        connect: [{ name: category }],
      },
      published,
    },
  });

  return NextResponse.json(updatedPost);
}

