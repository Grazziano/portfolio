const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Verificar se já existe um usuário admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
    });

    if (!existingAdmin) {
      // Criar usuário admin se não existir
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const user = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          name: 'Admin',
          password: hashedPassword,
        },
      });

      console.log('Usuário admin criado com sucesso:', user.email);
    } else {
      console.log('Usuário admin já existe:', existingAdmin.email);
    }
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
