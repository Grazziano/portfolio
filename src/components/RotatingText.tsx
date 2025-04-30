'use client';
import React, { useEffect, useState } from 'react';

const skills = [
  'Full Stack Developer',
  'Web Developer',
  'React JS | Next JS',
  'Express | Nest JS',
  'Typescript | Javascript',
  'MySQl | Postgres',
];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 3000); // troca a cada 3 segundos

    return () => clearInterval(interval); // limpa o intervalo ao desmontar
  }, []);

  return (
    <div className="text-xl font-bold transition-opacity duration-500">
      {skills[index]}
    </div>
  );
}

export default RotatingText;
