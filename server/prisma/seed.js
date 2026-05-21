const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const medicines = [
  {
    name: 'Amoxicillin',
    description:
      'A broad-spectrum penicillin antibiotic used to treat bacterial infections including ear infections, strep throat, pneumonia, skin infections, and urinary tract infections. Available in capsules, tablets, and oral suspension forms.',
  },
  {
    name: 'Metformin',
    description:
      'First-line oral medication for type 2 diabetes management. Metformin reduces hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity. Commonly prescribed alongside lifestyle modifications.',
  },
  {
    name: 'Lisinopril',
    description:
      'An ACE inhibitor used to treat high blood pressure (hypertension) and heart failure. Lisinopril relaxes blood vessels, making it easier for the heart to pump blood. Also prescribed after a heart attack to improve survival.',
  },
  {
    name: 'Atorvastatin',
    description:
      'A statin medication prescribed to lower cholesterol and triglycerides in the blood. Atorvastatin reduces the risk of heart attack, stroke, and other cardiovascular complications in patients with risk factors.',
  },
  {
    name: 'Omeprazole',
    description:
      'A proton pump inhibitor (PPI) that reduces stomach acid production. Used to treat gastroesophageal reflux disease (GERD), stomach ulcers, and conditions caused by excess stomach acid such as Zollinger-Ellison syndrome.',
  },
  {
    name: 'Amlodipine',
    description:
      'A calcium channel blocker used to treat high blood pressure and chest pain (angina). Amlodipine relaxes blood vessels, allowing the heart to pump more efficiently. It is often used in combination with other antihypertensive medications.',
  },
  {
    name: 'Azithromycin',
    description:
      'A macrolide antibiotic effective against a wide range of bacterial infections including respiratory tract infections, ear infections, sexually transmitted infections, and skin infections. Known for its convenient dosing schedule.',
  },
  {
    name: 'Levothyroxine',
    description:
      'A synthetic thyroid hormone used as hormone replacement therapy for hypothyroidism (underactive thyroid). Levothyroxine restores normal thyroid hormone levels, alleviating symptoms such as fatigue, weight gain, and cold sensitivity.',
  },
  {
    name: 'Ibuprofen',
    description:
      'A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce fever, and decrease inflammation. Commonly used for headaches, dental pain, menstrual cramps, muscle aches, arthritis, and minor injuries.',
  },
  {
    name: 'Paracetamol',
    description:
      'Also known as acetaminophen, this widely used analgesic and antipyretic relieves mild to moderate pain and reduces fever. Suitable for adults and children, it is a first-choice medication for pain management in most clinical guidelines.',
  },
  {
    name: 'Cetirizine',
    description:
      'A second-generation antihistamine used to relieve allergy symptoms such as runny nose, sneezing, itchy eyes, and hives. Cetirizine causes less drowsiness than older antihistamines and provides 24-hour allergy relief.',
  },
  {
    name: 'Metoprolol',
    description:
      'A cardioselective beta-blocker used to treat high blood pressure, angina, heart failure, and certain heart rhythm disorders. Metoprolol works by blocking adrenaline effects on the heart, reducing heart rate and blood pressure.',
  },
];

async function main() {
  console.log('Seeding database...');

  await prisma.medicine.deleteMany();

  const created = await prisma.medicine.createMany({ data: medicines });

  console.log(`Seeded ${created.count} medicines successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
