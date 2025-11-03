'use client';
import { useEffect, useState } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import LogoutButton from '@/components/admin/LogoutButton';
import { Project } from '@/lib/projects';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Projetos</h1>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Adicionar Novo Projeto
            </h2>
            <ProjectForm
              onProjectAdded={(newProject) => {
                setProjects([...projects, newProject]);
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Projetos Existentes</h2>
            {loading ? (
              <p>Carregando projetos...</p>
            ) : (
              <ProjectList
                projects={projects}
                onProjectDeleted={(id) => {
                  setProjects(projects.filter((p) => p.id !== id));
                }}
                onProjectUpdated={(updatedProject) => {
                  setProjects(
                    projects.map((p) =>
                      p.id === updatedProject.id ? updatedProject : p
                    )
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
