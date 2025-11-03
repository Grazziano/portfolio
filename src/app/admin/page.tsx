'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gerencie suas informações de acesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Atualize seu email e senha de acesso ao sistema.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/profile')}>
              Gerenciar Perfil
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Gerencie seus projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Adicione, edite ou remova projetos do seu portfólio.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/projects')}>
              Gerenciar Projetos
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>Configurações do site</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Ajuste as configurações gerais do seu portfólio.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/settings')}>
              Configurações
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6">
        <Button variant="destructive" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
