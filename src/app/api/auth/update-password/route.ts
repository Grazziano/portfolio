import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, getUserByEmail, updateUserPassword } from '@/lib/auth';
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
    const { currentPassword, newPassword } = await request.json();

    // Validar dados
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Senha atual e nova senha são obrigatórias' },
        { status: 400 }
      );
    }

    // Buscar usuário pelo email do token
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

    // Atualizar senha
    await updateUserPassword(user.id, newPassword);

    return NextResponse.json(
      { message: 'Senha atualizada com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar senha' },
      { status: 500 }
    );
  }
}
