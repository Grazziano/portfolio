import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Rotas que requerem autenticação
  const protectedPaths = ['/admin/projects'];
  const path = request.nextUrl.pathname;

  // Verificar se a rota atual requer autenticação
  const isProtectedPath = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  );

  if (isProtectedPath) {
    // Verificação simplificada - apenas verifica se o cookie auth existe
    const authCookie = request.cookies.get('auth')?.value;

    if (!authCookie || authCookie !== 'true') {
      // Redirecionar para a página de login se não houver cookie
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/projects/:path*'],
};
