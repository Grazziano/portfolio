import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import LoginFormClient from './loginFormClient';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return <LoginFormClient />;
}
