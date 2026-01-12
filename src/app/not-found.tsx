import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="text-muted-foreground max-w-xl">
          O recurso que você procura não existe ou foi movido. Verifique o
          endereço ou volte para a página inicial.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Voltar para a Home</Link>
      </Button>
    </main>
  );
}
