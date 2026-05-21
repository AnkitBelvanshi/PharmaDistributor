const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const imageMap = [
  { name: 'Amoxicillin',    image: 'amoxicillin-500mg.jpg' },
  { name: 'Metformin',      image: 'metformin-850mg.jpg' },
  { name: 'Lisinopril',     image: 'lisinopril-10mg.jpg' },
  { name: 'Atorvastatin',   image: 'atorvastatin-20mg.jpg' },
  { name: 'Omeprazole',     image: 'omeprazole-20mg.jpg' },
  { name: 'Amlodipine',     image: 'amlodipine-5mg.jpg' },
  { name: 'Azithromycin',   image: 'azithromycin-250mg.jpg' },
  { name: 'Levothyroxine',  image: 'levothyroxine-50mcg.jpg' },
  { name: 'Ibuprofen',      image: 'ibuprofen-400mg.jpg' },
  { name: 'Paracetamol',    image: 'paracetamol-500mg.jpg' },
  { name: 'Cetirizine',     image: 'cetirizine-10mg.jpg' },
  { name: 'Metoprolol',     image: 'metoprolol-50mg.jpg' },
];

async function main() {
  for (const { name, image } of imageMap) {
    const updated = await prisma.medicine.updateMany({
      where: { name },
      data: { image },
    });
    console.log(`${name}: ${updated.count ? '✓ updated' : '⚠ not found'}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
