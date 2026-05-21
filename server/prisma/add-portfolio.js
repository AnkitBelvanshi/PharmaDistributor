const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const portfolio = [
  {
    name: 'Enhertu',
    image: 'enhertu--trastuzumab-deruxtecan-.jpg',
    description:
      'Enhertu (trastuzumab deruxtecan) is an antibody-drug conjugate (ADC) targeting HER2. Indicated for unresectable or metastatic HER2-positive breast cancer, HER2-positive gastric or gastroesophageal junction adenocarcinoma, and HER2-mutant non-small cell lung cancer after prior systemic therapy.',
  },
  {
    name: 'Vebulis',
    image: 'vebulis--trabectedin-.jpg',
    description:
      'Vebulis (trabectedin) is an alkylating antineoplastic agent used to treat unresectable or metastatic liposarcoma or leiomyosarcoma in adult patients who received prior anthracycline-containing regimens.',
  },
  {
    name: 'Columvi',
    image: 'columvi--glofitamab-.jpg',
    description:
      'Columvi (glofitamab) is a CD20xCD3 T-cell engaging bispecific antibody indicated for relapsed or refractory diffuse large B-cell lymphoma (DLBCL) after two or more prior lines of systemic therapy.',
  },
  {
    name: 'Firdapse',
    image: 'firdapse--amifampridine-.jpg',
    description:
      'Firdapse (amifampridine) is a potassium channel blocker approved for the treatment of Lambert-Eaton myasthenic syndrome (LEMS) in adults, improving neuromuscular transmission by increasing calcium influx.',
  },
  {
    name: 'Ponatinib',
    image: 'ponatinib.jpg',
    description:
      'Ponatinib is a third-generation BCR-ABL tyrosine kinase inhibitor approved for chronic myeloid leukemia (CML) and Philadelphia chromosome-positive acute lymphoblastic leukemia (Ph+ ALL), including T315I-mutant disease resistant to prior TKI therapy.',
  },
  {
    name: 'Prevymis',
    image: 'prevymis--letermovir-.jpg',
    description:
      'Prevymis (letermovir) is an antiviral agent that inhibits cytomegalovirus (CMV) DNA terminase complex. Indicated for prophylaxis of CMV infection and disease in CMV-seropositive adult recipients of allogeneic hematopoietic stem cell transplants.',
  },
  {
    name: 'Imdelltra',
    image: 'imdelltra--tarlatamab-.jpg',
    description:
      'Imdelltra (tarlatamab) is a DLL3xCD3 bispecific T-cell engager antibody indicated for adult patients with extensive-stage small cell lung cancer (ES-SCLC) with disease progression on or after platinum-based chemotherapy.',
  },
  {
    name: 'Erwinase',
    image: 'erwinase--asparaginase-erwinia-chrysanthemi-.jpg',
    description:
      'Erwinase (asparaginase Erwinia chrysanthemi) is an enzyme used to treat acute lymphoblastic leukemia (ALL) in patients who have developed hypersensitivity to E. coli-derived asparaginase. Depletes asparagine to starve rapidly dividing lymphoblasts.',
  },
  {
    name: 'Trodelvy',
    image: 'trodelvy--sacituzumab-govitecan-.jpg',
    description:
      'Trodelvy (sacituzumab govitecan) is a Trop-2-directed antibody-drug conjugate approved for metastatic triple-negative breast cancer, metastatic urothelial cancer, and HR+/HER2-negative metastatic breast cancer after prior endocrine therapy.',
  },
  {
    name: 'Tuksya',
    image: 'tuksya--tucatinib-.jpg',
    description:
      'Tuksya (tucatinib) is a selective HER2 tyrosine kinase inhibitor used in combination with trastuzumab and capecitabine for advanced unresectable or metastatic HER2-positive breast cancer, including patients with brain metastases.',
  },
  {
    name: 'Braftovi',
    image: 'braftovi--encorafenib-.jpg',
    description:
      'Braftovi (encorafenib) is a BRAF kinase inhibitor used in combination with binimetinib for unresectable or metastatic melanoma with BRAF V600E/K mutations, and with cetuximab for BRAF V600E-mutant metastatic colorectal cancer.',
  },
  {
    name: 'Anagrelide',
    image: 'anagrelide.jpg',
    description:
      'Anagrelide is a platelet-reducing agent that inhibits platelet aggregation and megakaryocyte maturation. Indicated for the treatment of essential thrombocythemia to reduce elevated platelet count and the risk of thrombotic complications.',
  },
  {
    name: 'Foscavir',
    image: 'foscavir--foscarnet-.jpg',
    description:
      'Foscavir (foscarnet sodium) is an antiviral pyrophosphate analogue that inhibits viral DNA polymerase. Used for treatment of cytomegalovirus (CMV) retinitis and acyclovir-resistant mucocutaneous herpes simplex in immunocompromised patients.',
  },
  {
    name: 'Blincyto',
    image: 'blincyto--blinatumomab-.jpg',
    description:
      'Blincyto (blinatumomab) is a BiTE (bispecific T-cell engager) antibody connecting CD3-positive T cells to CD19-positive B cells. Approved for relapsed/refractory B-cell precursor acute lymphoblastic leukemia and MRD-positive B-cell ALL.',
  },
  {
    name: 'Minjuvi',
    image: 'minjuvi--tafasitamab-.jpg',
    description:
      'Minjuvi (tafasitamab) is a CD19-directed cytolytic antibody used in combination with lenalidomide for relapsed or refractory diffuse large B-cell lymphoma (DLBCL) in patients not eligible for autologous stem cell transplantation.',
  },
  {
    name: 'Ayvakit',
    image: 'ayvakit--avapritinib-.jpg',
    description:
      'Ayvakit (avapritinib) is a KIT and PDGFRA kinase inhibitor approved for unresectable or metastatic GIST harboring PDGFRA exon 18 mutations and for advanced systemic mastocytosis including aggressive and mast cell leukemia variants.',
  },
  {
    name: 'Venclyxto',
    image: 'venclyxto--venetoclax-.jpg',
    description:
      'Venclyxto (venetoclax) is a selective BCL-2 inhibitor that restores the apoptosis pathway in cancer cells. Approved for chronic lymphocytic leukemia, small lymphocytic lymphoma, and acute myeloid leukemia in combination regimens.',
  },
  {
    name: 'Emicitab',
    image: 'emcitate--emtricitabine-.jpg',
    description:
      'Emicitab (emtricitabine) is a nucleoside reverse transcriptase inhibitor (NRTI) used as a component of combination antiretroviral therapy for HIV-1 infection in adults and paediatric patients. Also used in combination regimens for hepatitis B.',
  },
  {
    name: 'Jascayd',
    image: 'jascayd--teclistamab-.jpg',
    description:
      'Jascayd (teclistamab) is a BCMAxCD3 bispecific antibody approved for relapsed or refractory multiple myeloma in adults who have received at least four prior lines of therapy including a proteasome inhibitor, an immunomodulatory agent, and an anti-CD38 antibody.',
  },
  {
    name: 'Truqap',
    image: 'truqap--capivasertib-.jpg',
    description:
      'Truqap (capivasertib) is an AKT kinase inhibitor used in combination with fulvestrant for hormone receptor-positive, HER2-negative locally advanced or metastatic breast cancer with one or more PIK3CA/AKT1/PTEN alterations following progression on endocrine therapy.',
  },
  {
    name: 'Defitelio',
    image: 'defitelio--defibrotide-.jpg',
    description:
      'Defitelio (defibrotide sodium) is a polydeoxyribonucleotide with profibrinolytic and anti-thrombotic properties. Approved for the treatment of severe hepatic veno-occlusive disease (VOD) with renal or pulmonary dysfunction following haematopoietic stem cell transplantation.',
  },
  {
    name: 'Inqovi',
    image: 'inqovi--decitabine-cedazuridine-.jpg',
    description:
      'Inqovi (decitabine and cedazuridine) is an oral hypomethylating agent combination for myelodysplastic syndromes (MDS) and chronic myelomonocytic leukaemia (CMML). Cedazuridine inhibits cytidine deaminase, enabling oral bioavailability of decitabine.',
  },
  {
    name: 'Kineret',
    image: 'kineret--anakinra-.jpg',
    description:
      'Kineret (anakinra) is a recombinant IL-1 receptor antagonist that blocks the biological activity of interleukin-1. Indicated for rheumatoid arthritis, cryopyrin-associated periodic syndromes (CAPS), Still\'s disease, and familial Mediterranean fever.',
  },
  {
    name: 'Cotellic',
    image: 'cotellic--cobimetinib-.jpg',
    description:
      'Cotellic (cobimetinib) is a MEK1/2 inhibitor used in combination with vemurafenib for unresectable or metastatic melanoma with BRAF V600E or V600K mutations. Dual BRAF-MEK blockade improves outcomes versus single-agent BRAF inhibition.',
  },
  {
    name: 'Adcetris',
    image: 'adcetris--brentuximab-vedotin-.jpg',
    description:
      'Adcetris (brentuximab vedotin) is a CD30-directed antibody-drug conjugate approved for classical Hodgkin lymphoma, systemic anaplastic large cell lymphoma, and primary cutaneous ALCL following failure of other therapies.',
  },
  {
    name: 'Selpercatinib',
    image: 'selpercatinib.jpg',
    description:
      'Selpercatinib is a selective RET kinase inhibitor approved for adults and paediatric patients 12 years and older with advanced or metastatic RET-mutant medullary thyroid cancer, RET fusion-positive thyroid cancer, and RET fusion-positive NSCLC.',
  },
  {
    name: 'Giotrif',
    image: 'giotrif--afatinib-.jpg',
    description:
      'Giotrif (afatinib) is a second-generation irreversible ErbB family blocker (EGFR/HER2) approved for first-line treatment of EGFR mutation-positive metastatic non-small cell lung cancer and squamous cell NSCLC progressing on platinum-based chemotherapy.',
  },
  {
    name: 'Itovebi',
    image: 'itovebi--inavolisib-.jpg',
    description:
      'Itovebi (inavolisib) is a selective PI3Kα inhibitor used in combination with palbociclib and fulvestrant for endocrine-resistant, PIK3CA-mutated, hormone receptor-positive, HER2-negative locally advanced or metastatic breast cancer.',
  },
  {
    name: 'Atriance',
    image: 'atriance--nelarabine-.jpg',
    description:
      'Atriance (nelarabine) is a purine nucleoside analogue prodrug of 9-β-D-arabinofuranosylguanine (ara-G). Indicated for T-cell acute lymphoblastic leukaemia (T-ALL) and T-cell lymphoblastic lymphoma (T-LBL) refractory to or relapsed after at least two prior regimens.',
  },
  {
    name: 'Mounjaro',
    image: 'mounjaro--tirzepatide-.jpg',
    description:
      'Mounjaro (tirzepatide) is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist. Approved for type 2 diabetes mellitus management and as an adjunct to diet and exercise for chronic weight management.',
  },
  {
    name: 'Zepzelca',
    image: 'zepzelca--lurbinectedin-.jpg',
    description:
      'Zepzelca (lurbinectedin) is an RNA polymerase II inhibitor that selectively blocks active transcription of oncogenes. Approved for adult patients with metastatic small cell lung cancer (SCLC) with disease progression on or after platinum-based chemotherapy.',
  },
  {
    name: 'Diacomit',
    image: 'diacomit--stiripentol-.jpg',
    description:
      'Diacomit (stiripentol) is an anticonvulsant that enhances GABA-mediated inhibition and inhibits cytochrome P450 enzymes. Used as adjunctive therapy with clobazam and valproate for Dravet syndrome (severe myoclonic epilepsy of infancy) in children.',
  },
  {
    name: 'Pozelimab',
    image: 'pozelimab.jpg',
    description:
      'Pozelimab is a fully human monoclonal antibody that inhibits complement factor C5, blocking the terminal complement cascade. Approved for the treatment of uncontrolled paroxysmal nocturnal haemoglobinuria (PNH) in adults.',
  },
  {
    name: 'Baclofen',
    image: 'baclofen--itb---oral-.jpg',
    description:
      'Baclofen is a centrally acting GABA-B receptor agonist used as a muscle relaxant and antispastic agent. Available in oral and intrathecal forms for spasticity of spinal origin (multiple sclerosis, spinal cord injury) and spasticity of cerebral origin.',
  },
  {
    name: 'Orserdu',
    image: 'orserdu--elacestrant-.jpg',
    description:
      'Orserdu (elacestrant) is an oral selective oestrogen receptor degrader (SERD) indicated for ER-positive, HER2-negative advanced or metastatic breast cancer with ESR1 mutation in postmenopausal women and men following progression on endocrine therapy.',
  },
  {
    name: 'Ventavis',
    image: 'ventavis--iloprost-.jpg',
    description:
      'Ventavis (iloprost) is an inhaled prostacyclin analogue that dilates systemic and pulmonary arterial vascular beds. Indicated for pulmonary arterial hypertension (PAH) to improve exercise tolerance, symptoms, and delay clinical worsening.',
  },
  {
    name: 'Xiidra',
    image: 'xiidra--lifitegrast-.jpg',
    description:
      'Xiidra (lifitegrast) is a lymphocyte function-associated antigen-1 (LFA-1) antagonist ophthalmic solution that disrupts T-cell-mediated inflammation. Approved for the treatment of signs and symptoms of dry eye disease (DED) in adults.',
  },
  {
    name: 'Ilopera',
    image: 'ilopera--iloprost-.jpg',
    description:
      'Ilopera (iloprost) is an intravenous prostacyclin analogue used for severe Raynaud\'s phenomenon secondary to systemic sclerosis and for pulmonary arterial hypertension. Provides potent vasodilation and inhibits platelet aggregation.',
  },
  {
    name: 'Fetroja SDV',
    image: 'fetroja-sdv--cefiderocol-.jpg',
    description:
      'Fetroja SDV (cefiderocol) is a novel siderophore cephalosporin antibiotic that actively penetrates Gram-negative bacteria using iron transport systems. Approved for hospital-acquired and ventilator-associated bacterial pneumonia and complicated urinary tract infections caused by carbapenem-resistant organisms.',
  },
  {
    name: 'Vyloy',
    image: 'vyloy--zolbetuximab-.jpg',
    description:
      'Vyloy (zolbetuximab) is a Claudin 18.2 (CLDN18.2)-targeting antibody approved in combination with fluoropyrimidine- and platinum-containing chemotherapy for HER2-negative, locally advanced unresectable or metastatic gastric or gastroesophageal junction adenocarcinoma.',
  },
  {
    name: 'Poteligeo',
    image: 'poteligeo--mogamulizumab-.jpg',
    description:
      'Poteligeo (mogamulizumab) is a defucosylated anti-CCR4 monoclonal antibody approved for relapsed or refractory mycosis fungoides or Sézary syndrome (cutaneous T-cell lymphoma) after at least one prior systemic therapy.',
  },
];

async function main() {
  let added = 0;
  let skipped = 0;

  for (const med of portfolio) {
    const existing = await prisma.medicine.findFirst({
      where: { name: { equals: med.name, mode: 'insensitive' } },
    });

    if (existing) {
      // Update image if it's missing
      if (!existing.image) {
        await prisma.medicine.update({ where: { id: existing.id }, data: { image: med.image } });
        console.log(`↑ Updated image for: ${med.name}`);
      } else {
        console.log(`- Skipped (already exists): ${med.name}`);
        skipped++;
      }
    } else {
      await prisma.medicine.create({ data: med });
      console.log(`✓ Added: ${med.name}`);
      added++;
    }
  }

  console.log(`\nDone — ${added} added, ${skipped} skipped.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
