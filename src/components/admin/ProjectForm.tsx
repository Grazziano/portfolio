'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { X } from 'lucide-react';
import { Project } from '@/lib/projects';

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
  onProjectAdded?: (project: Project) => void;
  onProjectUpdated?: (project: Project) => void;
}

export default function ProjectForm({
  project,
  onSuccess,
  onProjectAdded,
  onProjectUpdated,
}: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    imageUrl: project?.imageUrl || '',
    demoUrl: project?.demoUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
  });

  const [technology, setTechnology] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies || []
  );
  const [techInput, setTechInput] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.title || !formData.description || technologies.length === 0) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    try {
      const projectData = {
        ...formData,
        technologies,
      };

      const url = project?.id ? `/api/projects/${project.id}` : '/api/projects';

      const method = project?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar o projeto');
      }

      const savedProject = await response.json();

      if (project?.id) {
        setSuccess('Projeto atualizado com sucesso!');
        onProjectUpdated?.(savedProject);
      } else {
        setSuccess('Projeto adicionado com sucesso!');
        onProjectAdded?.(savedProject);
        // Limpar formulário se for uma criação
        setFormData({
          title: '',
          description: '',
          imageUrl: '',
          demoUrl: '',
          githubUrl: '',
          featured: false,
        });
        setTechnologies([]);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
      setError('Ocorreu um erro ao salvar o projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Título *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descrição *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
          URL da Imagem
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="demoUrl" className="block text-sm font-medium mb-1">
          URL da Demo
        </label>
        <input
          type="url"
          id="demoUrl"
          name="demoUrl"
          value={formData.demoUrl}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium mb-1">
          URL do GitHub
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tecnologias *</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2"
            placeholder="Adicionar tecnologia"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Adicionar
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-sm hover:text-red-500"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Projeto em destaque
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {loading
          ? 'Salvando...'
          : project?.id
          ? 'Atualizar Projeto'
          : 'Criar Projeto'}
      </button>
    </form>
  );
}
