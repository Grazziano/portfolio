'use client';
import React, { useState } from 'react';
import { projectsData, categories } from '@/data/projects';
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

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="px-16 py-24">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Here are some of the projects I've worked on. Each project presented
            unique challenges and opportunities for growth.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={activeCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('All')}
            className="mb-2"
          >
            All
          </Button>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
