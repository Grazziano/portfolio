import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Buscar o arquivo resume.pdf no blob storage
    const { blobs } = await list({ prefix: 'resume.pdf' });

    const resumeBlob = blobs.find((blob) => blob.pathname === 'resume.pdf');

    if (!resumeBlob) {
      return NextResponse.json(
        { error: 'Currículo não encontrado' },
        { status: 404 }
      );
    }

    // Buscar o arquivo do blob storage
    const response = await fetch(resumeBlob.url);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao buscar arquivo' },
        { status: 500 }
      );
    }

    const fileBuffer = await response.arrayBuffer();

    // Retornar o arquivo com headers apropriados
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="grazziano_resume.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar currículo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar currículo' },
      { status: 500 }
    );
  }
}
