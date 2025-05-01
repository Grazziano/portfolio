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
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=800&h=600",
    github: "https://github.com/Grazziano/pizzaria",
    category: "Full Stack",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A responsive personal portfolio website to showcase projects and skills.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI"],
    image: "",
    github: "https://github.com/Grazziano/portfolio",
    category: "Frontend",
  },
];

export const categories = Array.from(
  new Set(projectsData.map((project) => project.category))
);
