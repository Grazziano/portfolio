import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/lib/projects';

export async function GET() {
  try {
    const projects = getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação básica
    if (
      !data.title ||
      !data.description ||
      !Array.isArray(data.technologies) ||
      data.technologies.length === 0
    ) {
      return NextResponse.json(
        { error: 'Título, descrição e tecnologias são obrigatórios' },
        { status: 400 }
      );
    }

    const newProject = createProject(data);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
