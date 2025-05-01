import React from 'react';
import { skillsData } from '@/data/skills';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

function About() {
  return (
    <section id="about" className="bg-secondary/30 px-4 md:px-8 lg:px-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">My Story</h3>
            <p className="mb-4 text-justify">
              Olá! Me chamo Grazziano, sou analista de sistemas com 36 anos,
              nascido e residente em Pelotas/RS. Iniciei minha trajetória na
              tecnologia em 2017, ao ingressar no curso de Tecnologia da
              Informação na FATEC-SENAC Pelotas, onde me formei em 2019. Durante
              esse período, atuei como estagiário na Companhia de Informática de
              Pelotas (COINPEL), de fevereiro de 2018 a fevereiro de 2021,
              trabalhando com PHP, Laravel e PostgreSQL no desenvolvimento e
              manutenção de sistemas públicos.
            </p>
            <p className="mb-4 text-justify">
              Em 2021, decidi aprofundar minha formação e ingressei na Trybe,
              escola de programação com foco em desenvolvimento web full stack.
              Concluí o curso em setembro de 2022, com mais de 1.500 horas de
              aprendizado prático em metodologias ágeis, versionamento de código
              (Git/GitHub), além de diversos projetos realizados em equipe.
            </p>
            <p className="mb-4 text-justify">
              Desde então, venho me especializando em tecnologias modernas como
              JavaScript, ReactJS, NodeJS, Typescript, Jest e MySQL. Tenho foco
              na escrita de código limpo, testes automatizados e soluções
              escaláveis, sempre buscando contribuir com projetos que impactem
              positivamente os usuários.
            </p>
            <p className="mb-6 text-justify">
              Em 18 de março de 2024, iniciei meu mestrado em Ciência da
              Computação na Universidade Federal de Pelotas (UFPel). Essa nova
              etapa acadêmica tem como objetivo aprofundar meus conhecimentos em
              áreas avançadas da computação, com foco em pesquisa, inovação e
              desenvolvimento de soluções tecnológicas. A pós-graduação também
              tem contribuído significativamente para ampliar minha visão
              crítica e analítica, além de fortalecer minha atuação profissional
              com uma base teórica sólida.
            </p>
            <Button asChild>
              <a
                href="https://drive.google.com/file/d/1IdTIrHVrGnRfOOl4gKh4Cn0MEF_kXv8Z/view?usp=drive_link"
                target="_blank"
                download="grazziano_resume.pdf"
              >
                Download Resume
              </a>
            </Button>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <div className="space-y-8">
              {skillsData.map((category, index) => (
                <div key={index} className="animate-fade-in">
                  <h4 className="font-medium text-lg mb-4">
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">
                            {skill.level}/5
                          </span>
                        </div>
                        <Progress value={skill.level * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
