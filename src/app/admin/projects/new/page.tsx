import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FormClient from './FormClient';

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return <FormClient />;
}
