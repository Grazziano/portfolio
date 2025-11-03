'use client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remover cookie de autenticação
    Cookies.remove('auth');
    // Redirecionar para a página de login
    router.push('/admin/login');
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}
