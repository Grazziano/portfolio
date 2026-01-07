'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import FormClient from './registerFormClient';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  adminToken: z.string().min(1),
});

export async function registerAction(formData: FormData) {
  try {
    const raw = {
      email: String(formData.get('email') || ''),
      name: String(formData.get('name') || ''),
      password: String(formData.get('password') || ''),
      adminToken: String(formData.get('adminToken') || ''),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return { error: 'Dados inválidos' };
    }
    if (!process.env.ADMIN_TOKEN) {
      return { error: 'ADMIN_TOKEN não configurado' };
    }
    if (parsed.data.adminToken !== process.env.ADMIN_TOKEN) {
      return { error: 'ADMIN_TOKEN inválido' };
    }
    const exists = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (exists) {
      return { error: 'Usuário já existe' };
    }
    const hash = await bcrypt.hash(parsed.data.password, 10);
    await prisma.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name,
        password: hash,
      },
    });
    return { success: 'Usuário registrado com sucesso' };
  } catch {
    return { error: 'Erro interno ao registrar' };
  }
}

export default async function RegisterPage() {
  return <FormClient action={registerAction} />;
}
