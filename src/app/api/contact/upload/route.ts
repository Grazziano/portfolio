import { del, list, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo (apenas PDF)
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Apenas arquivos PDF são permitidos' },
        { status: 400 }
      );
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 5MB' },
        { status: 400 }
      );
    }

    // Nome padrão para o arquivo
    const fileName = 'resume.pdf';

    // Deletar arquivo anterior se existir
    try {
      const { blobs } = await list({ prefix: fileName });
      for (const blob of blobs) {
        if (blob.pathname === fileName) {
          await del(blob.url);
        }
      }
    } catch (error) {
      // Ignorar erro se o arquivo não existir
      console.log('Arquivo anterior não encontrado ou erro ao deletar:', error);
    }

    // Converter File para Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Fazer upload para Vercel Blob Storage
    const blob = await put(fileName, buffer, {
      access: 'public',
      addRandomSuffix: false, // Manter nome fixo
      contentType: 'application/pdf',
    });

    return NextResponse.json({
      success: true,
      fileUrl: blob.url,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    return NextResponse.json(
      {
        error: 'Erro ao fazer upload do arquivo',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
