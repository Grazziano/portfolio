'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Project } from '@/data/projects';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { Github } from 'lucide-react';

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState('');

  type DbProject = {
    id?: string;
    title: string;
    description: string;
    technologies?: string[];
    image: string;
    github?: string | null;
    liveDemo?: string | null;
    category: string;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const mapped: Project[] = (data as DbProject[]).map(
            (p, index: number) => ({
              id: p.id ?? `db-${index}`,
              title: p.title,
              description: p.description,
              technologies: p.technologies ?? [],
              image: p.image,
              github: p.github ?? undefined,
              liveDemo: p.liveDemo ?? undefined,
              category: p.category,
            })
          );
          setDynamicProjects(mapped);
        }
      } catch {}
    };
    load();
  }, []);

  const allProjects = useMemo(() => [...dynamicProjects], [dynamicProjects]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allProjects.map((p) => p.category)))],
    [allProjects]
  );

  const filteredProjects = useMemo(() => {
    const byCategory =
      activeCategory === 'All'
        ? allProjects
        : allProjects.filter((project) => project.category === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((p) => {
      const techs = (p.technologies ?? []).join(' ').toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        techs.includes(q)
      );
    });
  }, [allProjects, activeCategory, query]);

  return (
    <section id="projects" className="px-4 py-24 md:px-8 lg:px-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Here are some of the projects I&apos;ve worked on. Each project
            presented unique challenges and opportunities for growth.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="max-w-xl mx-auto mb-10">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, descrição ou tecnologias"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
            >
              <div className="h-64 overflow-hidden bg-muted/30 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" /> Code
                    </a>
                  </Button>
                )}
                {project.liveDemo && (
                  <Button size="sm" asChild>
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
