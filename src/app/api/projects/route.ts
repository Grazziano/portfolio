import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.array(z.string()).default([]),
  image: z.string().url(),
  github: z.string().url().optional(),
  liveDemo: z.string().url().optional(),
  category: z.string().min(2),
});

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });
  const json = await req.json().catch(() => null);
  const parsed = projectSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(parsed.error.format(), { status: 400 });
  const created = await prisma.project.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}
