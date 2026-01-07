import { PrismaClient } from '@prisma/client';
import { projectsData } from '../src/data/projects';

const prisma = new PrismaClient();

async function main() {
  const before = await prisma.project.count();
  const existing = await prisma.project.findMany({
    select: { title: true },
  });
  const existingTitles = new Set(existing.map((e) => e.title));
  const toInsert = projectsData
    .filter((p) => !existingTitles.has(p.title))
    .map((p) => ({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      image: p.image,
      github: p.github ?? null,
      liveDemo: p.liveDemo ?? null,
      category: p.category,
    }));
  const inserted =
    toInsert.length > 0
      ? await prisma.project.createMany({
          data: toInsert,
          skipDuplicates: false,
        })
      : { count: 0 };
  const after = await prisma.project.count();
  console.log(JSON.stringify({ before, inserted: inserted.count ?? 0, after }));
}

main()
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
