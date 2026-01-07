import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const updateSchema = z
  .object({
    title: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    technologies: z.array(z.string()).optional(),
    image: z.string().url().optional(),
    github: z.string().url().nullable().optional(),
    liveDemo: z.string().url().nullable().optional(),
    category: z.string().min(2).optional(),
    listed: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'No fields to update',
  });

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const project = await prisma.project.findUnique({
    where: { id },
  });
  if (!project) {
    return new NextResponse('Not found', { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });
  const json = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(parsed.error.format(), { status: 400 });
  const updated = await prisma.project.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json(updated);
}
