'use client';
import React, { useState, useEffect } from 'react';
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
import { Project } from '@/lib/projects';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Falha ao carregar projetos');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError('Não foi possível carregar os projetos');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Extrair categorias únicas dos projetos
  const allCategories = [
    ...new Set(projects.map((project) => project.technologies[0] || 'Outros')),
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) =>
          project.technologies.includes(activeCategory)
        );

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

        {loading ? (
          <div className="text-center py-12">Carregando projetos...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <Button
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('All')}
                className="mb-2"
              >
                All
              </Button>
              {allCategories.map((category) => (
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

            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                Nenhum projeto encontrado.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
                  >
                    {project.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    )}
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
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" /> Code
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button size="sm" asChild>
                          <a
                            href={project.demoUrl}
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
            )}
          </>
        )}
      </div>
    </section>
  );
}
