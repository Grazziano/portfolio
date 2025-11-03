'use client';
import { useState } from 'react';
import { Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Star } from 'lucide-react';
import ProjectForm from './ProjectForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ProjectListProps {
  projects: Project[];
  onProjectDeleted?: (id: string) => void;
  onProjectUpdated?: (project: Project) => void;
}

export default function ProjectList({
  projects,
  onProjectDeleted,
  onProjectUpdated,
}: ProjectListProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingProjectId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingProjectId) return;

    try {
      const response = await fetch(`/api/projects/${deletingProjectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o projeto');
      }

      onProjectDeleted?.(deletingProjectId);
    } catch (err) {
      console.error('Erro ao excluir projeto:', err);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingProjectId(null);
    }
  };

  if (projects.length === 0) {
    return <p className="text-muted-foreground">Nenhum projeto cadastrado.</p>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border rounded-md p-4 hover:bg-accent/10 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{project.title}</h3>
                {project.featured && (
                  <Star
                    className="h-4 w-4 text-yellow-500"
                    fill="currentColor"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(project)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              project={editingProject}
              onProjectUpdated={(updatedProject) => {
                onProjectUpdated?.(updatedProject);
                setIsEditDialogOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este projeto? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
