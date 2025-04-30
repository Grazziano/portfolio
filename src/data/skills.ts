export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'JavaScript', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'React', level: 5 },
      { name: 'Next', level: 5 },
      { name: 'HTML/CSS', level: 5 },
      { name: 'Tailwind CSS', level: 4 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 4 },
      { name: 'Express', level: 4 },
      { name: 'NestJS', level: 4 },
      { name: 'MongoDB', level: 4 },
      { name: 'MySQL', level: 3 },
      { name: 'PostgreSQL', level: 3 },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git', level: 5 },
      { name: 'Docker', level: 3 },
      { name: 'Figma', level: 3 },
    ],
  },
];
