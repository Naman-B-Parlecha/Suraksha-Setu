// app/api/blog/[id]/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET({ params }) {
  const { id } = params;
  try {
    const post = await prisma.blog.findUnique({
      where: { id },
    });
    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
