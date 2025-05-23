export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  category: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with shopping cart, user authentication, and payment processing features.",
    technologies: ["Next.js", "TypeScript", "Ant Design", "Firebase", "MongoDB", "Stripe"],
    image: "https://github.com/Grazziano/ecommerce-app/blob/master/public/images/cart.png?raw=true",
    github: "https://github.com/Grazziano/ecommerce-app",
    liveDemo: "https://ecommerce-app-grazziano.vercel.app/auth/login",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Sistema de Chamados",
    description: "Aplicação para criação de chamados, com registro de usuários, login e controle de rotas.",
    technologies: ["React.js", "Firebase", "CSS"],
    image: "https://github.com/Grazziano/sistema-de-chamados/blob/master/docs/assets/sistema-chamados.PNG?raw=true",
    github: "https://github.com/Grazziano/sistema-de-chamados",
    liveDemo: "https://sistema-de-chamados-coral.vercel.app",
    category: "Full Stack",
  },
  {
    id: 3,
    title: "Api Vendas",
    description: "A RESTful API for a e-commerce platform with user authentication, product management, and order processing.",
    technologies: ["Node.js", "Express", "TypeScript", "TypeORM", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?fit=crop&w=800&h=600",
    github: "https://github.com/Grazziano/api-vendas",
    category: "Backend",
  },
  {
    id: 4,
    title: "Pizzaria",
    description: "A RESTful API for a social media platform with authentication, user profiles, and content management.",
    technologies: ["React", "React Native", "TypeScript", "Node.js", "Express", "PostgreSQL", "JWT"],
    image: "https://firebasestorage.googleapis.com/v0/b/portfolio-dca50.appspot.com/o/images%2Fpizzaria.png?alt=media&token=42a99a4b-4d07-4ae8-ba69-a095de4582d2",
    github: "https://github.com/Grazziano/pizzaria",
    category: "Full Stack",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A responsive personal portfolio website to showcase projects and skills.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI"],
    image: "https://github.com/Grazziano/portfolio/blob/master/public/img/portfolio.png?raw=true",
    github: "https://github.com/Grazziano/portfolio",
    liveDemo: "https://portfolio-grazzianos-projects.vercel.app",
    category: "Frontend",
  },
  {
    id: 6,
    title: "Barber API",
    description: "API para barbearia com autenticação, cadastro de clientes e agendamentos.",
    technologies: ["Express", "TypeScript", "Prisma", "Stripe"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=800&h=600",
    github: "https://github.com/Grazziano/barber-backend",
    category: "Backend",
  },
  {
    id: 7,
    title: "Event Booking App",
    description: "Aplicação de reserva de eventos (Event Booking App) desenvolvida com Next.js, utilizando Clerk para autenticação de usuários, MongoDB como banco de dados, e estilização com NextUI.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "NextUI", "Clerk"],
    image: "https://github.com/Grazziano/events-booking/blob/master/public/images/home.png?raw=true",
    github: "https://github.com/Grazziano/events-booking",
    liveDemo: "https://events-booking-ruby.vercel.app/",
    category: "Full Stack",
  },
  {
    id: 8,
    title: "NLW Planner",
    description: "Aplicação para planejar sua viagem.",
    technologies: ["React", "TypeScript"],
    image: "https://firebasestorage.googleapis.com/v0/b/portfolio-dca50.appspot.com/o/images%2Fnlw-planner.png?alt=media&token=132f3fea-cb9c-470e-8a6d-e1546f617236",
    github: "https://github.com/Grazziano/nlw-planner-react",
    category: "Frontend",
  },
  {
    id: 9,
    title: "Study Timer",
    description: "O Study Timer é uma aplicação para cronometrar tempo de estudo, auxiliando na organização do tempo.",
    technologies: ["React", "TypeScript", "SASS"],
    image: "https://github.com/Grazziano/study-timer/blob/master/public/app.png?raw=true",
    github: "https://github.com/Grazziano/study-timer",
    liveDemo: "https://study-timer-six.vercel.app/",
    category: "Frontend",
  },
  {
    id: 10,
    title: "App Finanças Pessoais",
    description: "Aplicativo de Finanças Pessoais com React Native.",
    technologies: ["React Native", "TypeScript"],
    image: "https://github.com/Grazziano/App-Financas-Pessoais/blob/master/docs/assets/image01.PNG?raw=true",
    github: "https://github.com/Grazziano/App-Financas-Pessoais",
    category: "Mobile",
  },
  {
    id: 11,
    title: "Article Finder",
    description: "Article Finder é uma aplicação que permite realizar buscas de artigos acadêmicos em diversas plataformas, como arXiv, Google Scholar, IEEE, ACM Digital Library e PubMed. A aplicação também permite gerenciar o histórico de pesquisas e artigos favoritos.",
    technologies: ["React", "TypeScript", "Chakra UI"],
    image: "https://firebasestorage.googleapis.com/v0/b/portfolio-dca50.appspot.com/o/images%2FCaptura%20de%20tela%2008-10-2024%2018.56.48.png?alt=media&token=f193e487-bc65-42fd-9586-67cf38923697",
    github: "https://github.com/Grazziano/article-finder",
    liveDemo: "https://article-finder-sigma.vercel.app/",
    category: "Frontend",
  },
  {
    id: 12,
    title: "Job Portal",
    description: "Este é um portal de empregos desenvolvido com Next.js 13, MongoDB, Ant Design (antd), TailwindCSS e TypeScript. O projeto visa fornecer uma plataforma intuitiva para empregadores postarem vagas de emprego e candidatos se inscreverem nelas.",
    technologies: ["React", "TypeScript", "MongoDB", "Ant Design", "TailwindCSS"],
    image: "https://github.com/Grazziano/job-portal/raw/master/public/screenshots/profile.png",
    github: "https://github.com/Grazziano/job-portal",
    liveDemo: "https://job-portal-grazziano.vercel.app/login",
    category: "Full Stack",
  },
  {
    id: 13,
    title: "Cronometro",
    description: "Aplicação para cronometrar tempo.",
    technologies: ["React Native", "TypeScript"],
    image: "https://github.com/Grazziano/App-Cronometro/raw/master/docs/assets/crono2.PNG",
    github: "https://github.com/Grazziano/App-Cronometro",
    category: "Mobile",
  },
  {
    id: 14,
    title: "Overflow - Question and Answer Platform",
    description: "Overflow é uma plataforma moderna de perguntas e respostas, desenvolvida com o objetivo de facilitar o compartilhamento de conhecimento entre desenvolvedores e entusiastas da tecnologia. A plataforma oferece uma interface intuitiva, autenticação segura e uma experiência rápida e dinâmica.",
    technologies: ["Next.js", "TypeScript", "Next UI", "MongoDB", "Clerk Auth"],
    image: "https://github.com/Grazziano/overflow/raw/master/public/screenshots/home.png",
    github: "https://github.com/Grazziano/overflow",
    liveDemo: "https://overflow-plum.vercel.app/",
    category: "Full Stack",
  },
  {
    id: 15,
    title: "Lista de Tarefas",
    description: "Lista de Tarefas React Native.",
    technologies: ["React Native"],
    image: "https://github.com/Grazziano/Tarefas-App/raw/master/docs/assets/tarefa1.PNG",
    github: "https://github.com/Grazziano/Tarefas-App",
    category: "Mobile",
  },
  {
    id: 16,
    title: "Barber Frontend",
    description: "Aplicação frontend para Barbearia com React.",
    technologies: ["React", "TypeScript", "Chakra UI", "Stripe", "axios"],
    image: "https://firebasestorage.googleapis.com/v0/b/portfolio-dca50.appspot.com/o/images%2Fbarberpro.PNG?alt=media&token=f4ad1122-6bae-4589-b77b-5daa0a8aedb2",
    github: "https://github.com/Grazziano/barber-frontend",
    category: "Frontend",
  },
  {
    id: 17,
    title: "Finance AI",
    description: "Finance AI é uma aplicação web voltada para o gerenciamento e análise financeira inteligente. Utilizando um conjunto robusto de tecnologias modernas, o projeto busca oferecer uma plataforma intuitiva e eficiente para análise e gestão financeira, com foco em acessibilidade e performance.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS", "Prisma", "ShadCN UI"],
    image: "https://firebasestorage.googleapis.com/v0/b/portfolio-dca50.appspot.com/o/images%2FCaptura%20de%20tela%2010-11-2024%2013.18.46.png?alt=media&token=faf22cef-e3b7-43fd-a5a0-e9390491f9d2",
    github: "https://github.com/Grazziano/finance-ai",
    liveDemo: "https://finance-ai-jade.vercel.app/login",
    category: "Full Stack",
  },
  {
    id: 18,
    title: "Pixel Board",
    description: "Pixel board React JS.",
    technologies: ["React", "SASS", "React Color", "react-component-export-image"],
    image: "https://firebasestorage.googleapis.com/v0/b/portfolio-dca50.appspot.com/o/images%2Fpixel.PNG?alt=media&token=eef2a9b2-db22-4e4e-826a-9ab5008d3ad7",
    github: "https://bitbucket.org/grazziano/pixel/src/master/",
    liveDemo: "https://pixel-oowfmbm59-grazziano.vercel.app/",
    category: "Frontend",
  },
  {
    id: 19,
    title: "Lista de Países",
    description: "Lista de Países com Next.js.",
    technologies: ["Next.js"],
    image: "https://bytebucket.org/grazziano/lista-de-paises/raw/b1df4c0622f35a2a1b7bf427ca6a16149e61c784/docs/assets/lista-de-paises.PNG",
    github: "https://bitbucket.org/grazziano/lista-de-paises/src/master/",
    liveDemo: "https://lista-de-paises-q4pryzclw-grazziano.vercel.app/",
    category: "Frontend",
  },
  {
    id: 20,
    title: "Flag Quiz - Guess the Flag Game",
    description: "Este é um jogo interativo de adivinhar bandeiras, desenvolvido com ReactJS e TypeScript, e estilizado com Chakra UI. O objetivo do jogo é testar seus conhecimentos sobre as bandeiras de diferentes países do mundo, oferecendo uma experiência divertida e educativa.",
    technologies: ["React", "TypeScript", "Chakra UI", "Rest Country API"],
    image: "https://github.com/Grazziano/flag-quiz/raw/master/public/images/app.png",
    github: "https://github.com/Grazziano/flag-quiz",
    liveDemo: "https://flag-quiz-nu.vercel.app/",
    category: "Frontend",
  },
  {
    id: 21,
    title: "Solar System",
    description: "Essa aplicação simulará uma visualização do Sistema Solar, bem como informações sobre diversas missões espacias que ocorreram ao longo da história.",
    technologies: ["React", "TypeScript", "Styled Components"],
    image: "https://github.com/Grazziano/solar-system/raw/master/docs/assets/planets.png",
    github: "https://github.com/Grazziano/solar-system",
    liveDemo: "https://solar-system-indol.vercel.app/",
    category: "Frontend",
  },
  {
    id: 22,
    title: "Dev Post",
    description: "Rede social Dev Post.",
    technologies: ["React Native", "Firebase", "Styled Components"],
    image: "https://github.com/Grazziano/App-rede-social-DevPost/raw/master/docs/assets/devpost03.PNG",
    github: "https://github.com/Grazziano/App-rede-social-DevPost",
    category: "Mobile",
  },
  {
    id: 23,
    title: "Sorteador de números",
    description: "Aplicação para sortear números.",
    technologies: ["React", "TypeScript", "Chakra UI"],
    image: "https://github.com/Grazziano/sorteador-de-numeros/raw/master/docs/assets/img/sorteador.PNG",
    github: "https://github.com/Grazziano/sorteador-de-numeros",
    liveDemo: "https://sorteador-de-numeros-xi.vercel.app/",
    category: "Frontend",
  },
  {
    id: 24,
    title: "Gerador de Senhas",
    description: "Aplicação para geração de senhas.",
    technologies: ["React", "TypeScript", "CSS"],
    image: "https://github.com/Grazziano/gerador-senha/raw/master/docs/assets/image1.PNG",
    github: "https://github.com/Grazziano/gerador-senha",
    liveDemo: "https://gerador-senha-mocha.vercel.app/",
    category: "Frontend",
  },
  {
    id: 25,
    title: "Conversor de Moedas",
    description: "Conversor de moedas com React Native.",
    technologies: ["React Native"],
    image: "https://github.com/Grazziano/conversor-moedas/raw/master/docs/assets/conversor2.PNG",
    github: "https://github.com/Grazziano/conversor-moedas",
    category: "Mobile",
  },
  {
    id: 26,
    title: "App Biscoito da Sorte",
    description: "Quebre o biscoito e descubra a mensagem!",
    technologies: ["React Native"],
    image: "https://github.com/Grazziano/App-Biscoito-da-Sorte/raw/master/docs/assets/biscoito2.PNG",
    github: "https://github.com/Grazziano/App-Biscoito-da-Sorte",
    category: "Mobile",
  },
  {
    id: 27,
    title: "Hey Grupos",
    description: "Aplicativo de mensagens realtime construido com React Native e Firebase.",
    technologies: ["React Native", "Firebase"],
    image: "https://github.com/Grazziano/HeyGrupos/raw/master/docs/assets/chat01.PNG",
    github: "https://github.com/Grazziano/HeyGrupos",
    category: "Mobile",
  },
  {
    id: 28,
    title: "Landing Page Travel App",
    description: "Esta é uma landing page projetada para promover experiências de viagem, construída utilizando Next.js, Tailwind CSS e TypeScript. A página oferece uma interface atraente onde os usuários podem explorar diferentes destinos, descobrir promoções especiais e se inspirar para suas próximas aventuras de viagem.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "https://github.com/Grazziano/travel-app/raw/master/public/screenshots/travel-app.png",
    github: "https://github.com/Grazziano/travel-app",
    liveDemo: "https://travel-app-liart-nine.vercel.app/",
    category: "Frontend",
  },
  {
    id: 29,
    title: "IMDB Clone",
    description: "Aplicação de clonagem da IMDB construida com Next.js e Tailwind CSS.",
    technologies: ["Next.js", "Tailwind CSS"],
    image: "https://github.com/Grazziano/imdb/raw/master/docs/assets/imdb.PNG",
    github: "https://github.com/Grazziano/imdb",
    liveDemo: "https://imdb-psi-fawn.vercel.app/",
    category: "Frontend",
  },
  {
    id: 30,
    title: "Calculadora Álcool x Gasolina",
    description: "A principal diferença entre os dois combustíveis está na proporção entre o preço e o desempenho de cada um. Compare o preço do litro do álcool e da gasolina e descubra qual é o combustível mais vantajoso. O etanol vale a pena quando custar até 70% do valor da gasolina.",
    technologies: ["React Native", "Expo"],
    image: "https://bytebucket.org/grazziano/calculadora-alcool-x-gasolina/raw/0693755203beb0c3f4cb49f5a946c0067dacddb8/docs/img/modal.PNG",
    github: "https://bitbucket.org/grazziano/calculadora-alcool-x-gasolina/src/master/",
    category: "Mobile",
  },
  {
    id: 31,
    title: "Repositórios",
    description: "Aplicação para salvar meu repositórios favoritos.",
    technologies: ["React", "Styled Components"],
    image: "https://github.com/Grazziano/repositorios/raw/master/public/app.PNG",
    github: "https://github.com/Grazziano/repositorios",
    category: "Frontend",
  },
  {
    id: 32,
    title: "Site para o restaurante Aluroni",
    description: "Página para listagem de pratos do restaurante.",
    technologies: ["React", "TypeScript", "Styled Components", "Docker", "Eslint"],
    image: "https://github.com/Grazziano/aluroni/raw/master/public/app.png",
    github: "https://github.com/Grazziano/aluroni",
    liveDemo: "https://aluroni-eight.vercel.app/",
    category: "Frontend",
  },
];

export const categories = Array.from(
  new Set(projectsData.map((project) => project.category))
);
