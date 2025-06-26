import prisma from "@/../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postId = parseInt(params.id);
  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid ID'}, { status: 400 }); 
  }

  const updated = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });

  return NextResponse.json(updated);
}