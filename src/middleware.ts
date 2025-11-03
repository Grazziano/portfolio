import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar se a rota é administrativa
  if (request.nextUrl.pathname.startsWith('/admin/projects')) {
    // Verificar se o usuário está autenticado
    // Em produção, use cookies ou JWT para autenticação
    const isAuthenticated = request.cookies.get('auth')?.value === 'true';

    if (!isAuthenticated) {
      // Redirecionar para a página de login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/projects/:path*'],
};
