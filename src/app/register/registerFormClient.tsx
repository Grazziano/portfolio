'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  action: (formData: FormData) => Promise<{ error?: string; success?: string }>;
};

export default function FormClient({ action }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);
    const formData = new FormData(e.currentTarget);
    const res = await action(formData);
    setLoading(false);
    if (res.error) {
      setIsError(true);
      setMessage(res.error);
    } else {
      setMessage(res.success || 'Sucesso');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Registrar Usuário</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <Input name="name" placeholder="Seu nome" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Senha</label>
            <Input
              name="password"
              type="password"
              placeholder="******"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Admin Token</label>
            <Input
              name="adminToken"
              type="password"
              placeholder="Informe o Admin Token"
              required
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                isError ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {message}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
