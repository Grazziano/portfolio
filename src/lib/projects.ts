import db from './db';

export interface Project {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function getAllProjects(): Project[] {
  const projects = db
    .prepare('SELECT * FROM projects ORDER BY featured DESC, createdAt DESC')
    .all();
  return projects.map((project) => ({
    ...project,
    technologies: JSON.parse(project.technologies),
    featured: Boolean(project.featured),
  }));
}

export function getProjectById(id: number): Project | undefined {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  if (!project) return undefined;

  return {
    ...project,
    technologies: JSON.parse(project.technologies),
    featured: Boolean(project.featured),
  };
}

export function createProject(project: Project): Project {
  const {
    title,
    description,
    imageUrl,
    demoUrl,
    githubUrl,
    technologies,
    featured,
  } = project;

  const stmt = db.prepare(`
    INSERT INTO projects (title, description, imageUrl, demoUrl, githubUrl, technologies, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    title,
    description,
    imageUrl || null,
    demoUrl || null,
    githubUrl || null,
    JSON.stringify(technologies),
    featured ? 1 : 0
  );

  return getProjectById(result.lastInsertRowid as number)!;
}

export function updateProject(
  id: number,
  project: Partial<Project>
): Project | undefined {
  const currentProject = getProjectById(id);
  if (!currentProject) return undefined;

  const updatedProject = { ...currentProject, ...project };

  const stmt = db.prepare(`
    UPDATE projects 
    SET title = ?, description = ?, imageUrl = ?, demoUrl = ?, githubUrl = ?, 
        technologies = ?, featured = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(
    updatedProject.title,
    updatedProject.description,
    updatedProject.imageUrl || null,
    updatedProject.demoUrl || null,
    updatedProject.githubUrl || null,
    JSON.stringify(updatedProject.technologies),
    updatedProject.featured ? 1 : 0,
    id
  );

  return getProjectById(id);
}

export function deleteProject(id: number): boolean {
  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  return result.changes > 0;
}
