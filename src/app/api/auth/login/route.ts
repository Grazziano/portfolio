import { NextResponse } from 'next/server';
import { authenticateUser, LoginCredentials } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as LoginCredentials;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await authenticateUser({ email, password });

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
        message: 'Login realizado com sucesso',
        user: result.user
      });
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}