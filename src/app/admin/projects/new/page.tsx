import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FormClient from './FormClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return (
    <>
      <Header />
      <main className="pt-16">
        <FormClient />
      </main>
      <Footer />
    </>
  );
}
