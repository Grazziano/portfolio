import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Verificar se a rota é administrativa
  if (request.nextUrl.pathname.startsWith('/admin/projects')) {
    // Verificar se o usuário está autenticado usando o token JWT
    const authToken = request.cookies.get('auth_token')?.value;

    if (!authToken) {
      // Redirecionar para a página de login se não houver token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verificar se o token é válido
    const { valid } = await verifyToken(authToken);

    if (!valid) {
      // Redirecionar para a página de login se o token for inválido
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/projects/:path*'],
};
