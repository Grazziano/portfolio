import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const token = req.headers.get('x-admin-token');
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(parsed.error.format(), { status: 400 });

  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (exists) return new NextResponse('Conflict', { status: 409 });

  const hash = await bcrypt.hash(parsed.data.password, 10);
  const created = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      password: hash,
    },
  });
  return NextResponse.json({ id: created.id, email: created.email });
}
