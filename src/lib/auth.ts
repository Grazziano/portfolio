import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || typeof credentials !== 'object') return null;
        const email = (credentials as Record<string, string>).email;
        const password = (credentials as Record<string, string>).password;
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name ?? undefined };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id?: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string | undefined;
      }
      return session;
    },
  },
};
