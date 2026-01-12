import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ResumeUploadForm from './ResumeUploadForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function SubmitResumePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-16 pt-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Atualizar Currículo
            </h1>
            <div className="h-1 w-20 bg-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Faça upload do seu currículo em formato PDF. O arquivo será
              atualizado no sistema.
            </p>
          </div>
          <ResumeUploadForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
