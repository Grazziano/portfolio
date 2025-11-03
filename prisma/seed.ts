import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Verificar se já existe um usuário admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
    });

    if (existingAdmin) {
      console.log('Usuário admin já existe!');
      return;
    }

    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Administrador',
      },
    });

    console.log('Usuário admin criado com sucesso:', admin);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
