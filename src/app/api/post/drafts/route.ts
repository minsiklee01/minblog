import prisma from "@/../lib/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  const drafts = await prisma.post.findMany({
    where: { published: false },
  });

  return NextResponse.json(drafts);
}