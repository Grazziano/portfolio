import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await createUser({ email, password, name });

    if (result.success && result.token) {
      // Configurar cookie de autenticação
      cookies().set({
        name: 'auth_token',
        value: result.token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 horas
        sameSite: 'strict',
      });

      return NextResponse.json({
        success: true,
        message: 'Usuário criado com sucesso',
        user: result.user
      });
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}