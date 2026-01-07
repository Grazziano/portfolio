import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FormEditClient from './FormEditClient';
import { prisma } from '@/lib/prisma';

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });
  if (!project) redirect('/');
  return (
    <FormEditClient
      id={params.id}
      initial={{
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        technologies: project.technologies ?? [],
        github: project.github ?? null,
        liveDemo: project.liveDemo ?? null,
        listed: project.listed,
      }}
    />
  );
}
