import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, getUserByEmail, updateUserEmail } from '@/lib/auth';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Verificar autenticação
    const token = cookies().get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    const tokenData = await verifyToken(token);
    if (!tokenData || !tokenData.id) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    // Obter dados do corpo da requisição
    const { email, currentPassword } = await request.json();

    // Validar dados
    if (!email || !currentPassword) {
      return NextResponse.json(
        { message: 'Email e senha atual são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário pelo ID do token
    const user = await getUserByEmail(tokenData.email);
    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar senha atual
    const isPasswordValid = await verifyPassword(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Senha atual incorreta' },
        { status: 401 }
      );
    }

    // Verificar se o novo email já está em uso
    if (email !== user.email) {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return NextResponse.json(
          { message: 'Este email já está em uso' },
          { status: 400 }
        );
      }
    }

    // Atualizar email
    await updateUserEmail(user.id, email);

    return NextResponse.json(
      { message: 'Email atualizado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar email:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar email' },
      { status: 500 }
    );
  }
}
