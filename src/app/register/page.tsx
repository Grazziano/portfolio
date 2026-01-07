'use client';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  password: z.string().min(6),
  adminToken: z.string().min(6),
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', name: '', password: '', adminToken: '' },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': values.adminToken,
      },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        password: values.password,
      }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Usuário registrado. Faça login.');
      location.assign('/login');
    } else {
      toast.error('Falha ao registrar usuário');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Registrar Usuário</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adminToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Token</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Token do Admin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
