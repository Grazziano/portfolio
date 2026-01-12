'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, FileText, LoaderCircle, Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  resume: z.instanceof(File, {
    message: 'Por favor, selecione um arquivo PDF',
  }),
});

function ResumeUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (file.type !== 'application/pdf') {
        toast.error('Apenas arquivos PDF são permitidos');
        return;
      }
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Arquivo muito grande. Tamanho máximo: 5MB');
        return;
      }
      setResumeFile(file);
      form.setValue('resume', file);
      setUploadSuccess(false);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    form.setValue('resume', undefined);
    setUploadSuccess(false);
    // Resetar o input de arquivo
    const fileInput = document.getElementById(
      'resume-input'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { resume } = values;
    setIsLoading(true);
    setUploadSuccess(false);

    try {
      if (!resume || !(resume instanceof File)) {
        throw new Error('Por favor, selecione um arquivo');
      }

      const formData = new FormData();
      formData.append('file', resume);

      const uploadResponse = await fetch('/api/contact/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Erro ao fazer upload do currículo');
      }

      const uploadData = await uploadResponse.json();

      toast.success('Currículo atualizado com sucesso!');
      setUploadSuccess(true);

      // Limpar o formulário após sucesso
      setTimeout(() => {
        handleRemoveFile();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Algo deu errado. Por favor, tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload de Currículo</CardTitle>
        <CardDescription>
          Selecione um arquivo PDF para fazer upload. O arquivo será salvo no
          servidor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resume"
              render={() => (
                <FormItem>
                  <FormLabel>Currículo (PDF)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {!resumeFile ? (
                        <div className="flex items-center gap-2">
                          <Input
                            id="resume-input"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm truncate max-w-[200px]">
                              {resumeFile.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({(resumeFile.size / 1024).toFixed(1)} KB)
                            </span>
                            {uploadSuccess && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveFile}
                            className="h-8 w-8 p-0"
                            disabled={isLoading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    Tamanho máximo: 5MB. Apenas arquivos PDF são aceitos.
                  </p>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading || !resumeFile || uploadSuccess}
              className="w-full cursor-pointer"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                  Enviando...
                </>
              ) : uploadSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Enviado com sucesso!
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer Upload
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ResumeUploadForm;
