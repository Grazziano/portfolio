'use client';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  image: z.union([z.string().url(), z.literal('')]).optional(),
  category: z.string().min(2),
  technologies: z.string().min(2),
  github: z.string().url().optional().or(z.literal('')),
  liveDemo: z.string().url().optional().or(z.literal('')),
  listed: z.boolean(),
});

type Props = {
  id: string;
  initial: {
    title: string;
    description: string;
    image: string | null;
    category: string;
    technologies: string[];
    github: string | null;
    liveDemo: string | null;
    listed: boolean;
  };
};

export default function FormEditClient({ id, initial }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial.title,
      description: initial.description,
      image: initial.image ?? '',
      category: initial.category,
      technologies: (initial.technologies ?? []).join(', '),
      github: initial.github ?? '',
      liveDemo: initial.liveDemo ?? '',
      listed: initial.listed,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    const payload: Record<string, any> = {
      title: values.title,
      description: values.description,
      category: values.category,
      technologies: values.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      github: values.github || null,
      liveDemo: values.liveDemo || null,
      listed: values.listed,
    };

    // Only add image if it's not empty
    if (values.image && values.image.trim()) {
      payload.image = values.image;
    } else {
      payload.image = null;
    }

    const res = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      alert('Projeto atualizado com sucesso');
      location.assign('/');
    } else {
      alert('Falha ao atualizar projeto');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl border rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Editar Projeto</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem (URL)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tecnologias (separadas por vírgula)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Next.js, TypeScript, Tailwind"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub (URL)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liveDemo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo (URL)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="listed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listar projeto</FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
