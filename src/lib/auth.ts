import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export async function authenticateUser({
  email,
  password,
}: LoginCredentials): Promise<AuthResult> {
  try {
    // Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Se o usuário não existir
    if (!user) {
      return {
        success: false,
        message: 'Credenciais inválidas',
      };
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        message: 'Credenciais inválidas',
      };
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      success: true,
      message: 'Autenticação bem-sucedida',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return {
      success: false,
      message: 'Erro ao processar a autenticação',
    };
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResult> {
  try {
    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'Este email já está em uso',
      };
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Criar novo usuário
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
      },
    });

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      success: true,
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return {
      success: false,
      message: 'Erro ao criar usuário',
    };
  }
}

export async function updateUserEmail(
  userId: string,
  newEmail: string
): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        email: newEmail,
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar email:', error);
    return false;
  }
}

export async function updateUserPassword(
  userId: string,
  newPassword: string
): Promise<boolean> {
  try {
    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return false;
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    return null;
  }
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function verifyToken(
  token: string
): Promise<{ valid: boolean; userId?: string }> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return { valid: true, userId: decoded.userId };
  } catch (error) {
    return { valid: false };
  }
}
