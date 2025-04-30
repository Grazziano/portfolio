# Portfólio Pessoal

Este é um projeto de portfólio pessoal desenvolvido com **Next.js**, **TypeScript**, **Tailwind CSS** e **ShadCN UI**, com o objetivo de apresentar projetos, experiências profissionais e habilidades técnicas.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React para aplicações web rápidas e escaláveis.
- [TypeScript](https://www.typescriptlang.org/) — Superset do JavaScript que adiciona tipagem estática.
- [Tailwind CSS](https://tailwindcss.com/) — Framework de utilitários CSS para construção de interfaces modernas.
- [ShadCN UI](https://ui.shadcn.dev/) — Coleção de componentes acessíveis e estilizados com Tailwind.

## Funcionalidades

- Página inicial com apresentação pessoal
- Seção de projetos com imagens, descrição e links
- Seção de experiências profissionais e formação acadêmica
- Contato com formulário funcional (opcional: integração com EmailJS ou outro serviço)
- Design responsivo e acessível
- Modo claro/escuro

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Grazziano/portfolio.git
cd portfolio
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse no navegador: `http://localhost:3000`

## Estrutura do Projeto

```
/
├── components/        # Componentes reutilizáveis da interface
├── app/               # Rotas e páginas (Next.js App Router)
├── public/            # Arquivos públicos (imagens, favicon, etc.)
├── styles/            # Estilos globais
├── data/              # Informações para listagem
├── lib/               # Funções auxiliares
├── types/             # Tipagens TypeScript
├── config/            # Configurações de temas e UI
```

## Deploy

Este projeto pode ser facilmente hospedado no [Vercel](https://vercel.com/) com suporte nativo ao Next.js.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
