import { useState, useEffect } from 'react';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const services = [
  {
    icon: '🧬',
    title: 'Named Patient Programme',
    desc: 'Facilitating legal access to specialty and rare disease medicines not commercially available in India, with full regulatory and compliance support.',
    modal: {
      subtitle: 'Specialty & Rare Disease Access',
      sections: [
        {
          icon: '💊',
          title: 'Specialty Medications: Legal Access, Lifesaving Impact',
          points: [
            'Supporting patients and healthcare professionals in acquiring medicines not available or registered in India',
            'Covered Therapies: Oncology, Hepatology, Neurology, Transplant, Hematology, Immunology, Nephrology',
            'Expertise in pharmacovigilance, ABAC compliance, patient confidentiality, and data protection',
            'Team of therapy specialists with strong domain expertise and clinical understanding',
          ],
        },
        {
          icon: '🔬',
          title: 'Rare Disease Medications: Bridging the Hope Gap',
          points: [
            'We aim to change lives by enabling access to treatments for rare diseases',
            'Strategic partnerships with global pharma companies focused on orphan drugs and niche therapies',
            'Access to treatment for conditions including: Duchenne Muscular Dystrophy, Lysosomal Storage Disorders, Organic Acidemias, Urea Cycle Disorders, Acute Intermittent Porphyria, MPS IV A, MPS VI, Hypophosphatasia, PKU, BH4 Deficiency, Batten Disease, and more',
          ],
        },
      ],
    },
  },
  {
    icon: '🚚',
    title: 'Bulk Distribution',
    desc: 'Large-volume pharmaceutical distribution to hospitals, government institutions, and pharmacy chains. Flexible MOQs and competitive pricing on bulk orders.',
    modal: {
      subtitle: 'Wholesale Pharmaceutical Supply',
      sections: [
        {
          icon: '📦',
          title: 'Volume & Pricing Advantages',
          points: [
            'Competitive pricing on bulk orders with volume-based discount tiers',
            'Flexible minimum order quantities tailored to institutional requirements',
            'Priority stock allocation during periods of national supply constraints',
            'Dedicated pricing agreements for government and public health tenders',
          ],
        },
        {
          icon: '🗺️',
          title: 'Logistics & Fulfilment',
          points: [
            'Pan-India distribution network covering 500+ cities and towns',
            'Dedicated fleet for large-volume and time-sensitive consignments',
            'Real-time order tracking with live consignment status updates',
            'Scheduled delivery windows for predictable and reliable supply planning',
          ],
        },
      ],
    },
  },
  {
    icon: '🏥',
    title: 'Hospital Supply',
    desc: 'Dedicated supply chain solutions for hospitals and healthcare systems — including scheduled deliveries, formulary management, and emergency restocking.',
    modal: {
      subtitle: 'End-to-End Hospital Procurement',
      sections: [
        {
          icon: '📋',
          title: 'Formulary & Supply Management',
          points: [
            'Formulary-aligned product catalogue mapped to hospital procurement needs',
            'Scheduled daily, weekly, and monthly delivery plans for predictable stock',
            'Emergency restocking within 4–8 hours for critical and life-saving medicines',
            'Dedicated hospital account manager for seamless day-to-day coordination',
          ],
        },
        {
          icon: '✅',
          title: 'Compliance & Documentation',
          points: [
            'NABH and JCI-compliant invoicing and delivery documentation',
            'Full batch traceability from manufacturer to point of care',
            'Expiry date management with FIFO dispatch protocol enforced',
            'Complete audit trail support for hospital accreditation processes',
          ],
        },
      ],
    },
  },
  {
    icon: '💊',
    title: 'Retail Pharmacy Supply',
    desc: 'Reliable next-day and same-day supply for independent pharmacies and retail chains, with an extensive catalogue covering OTC and prescription medicines.',
    modal: {
      subtitle: 'Retail & Independent Pharmacy Partners',
      sections: [
        {
          icon: '🗂️',
          title: 'Product Range & Availability',
          points: [
            '500+ SKUs covering OTC, prescription, and specialty medicines',
            'Same-day delivery for orders placed before 12 noon',
            'Next-day fulfilment guaranteed for all standard catalogue items',
            'Substitution alerts when branded or generic alternatives are available',
          ],
        },
        {
          icon: '🤝',
          title: 'Business & Credit Support',
          points: [
            'Flexible credit terms of 30 and 60 days for registered pharmacy partners',
            'Digital ordering via web portal or WhatsApp for quick convenience',
            'Return and replacement policy for damaged or near-expiry stock',
            'Monthly purchasing analytics and sales reports for business planning',
          ],
        },
      ],
    },
  },
  {
    icon: '❄️',
    title: 'Cold-Chain Logistics',
    desc: 'Temperature-controlled storage and transport for vaccines, biologics, and other heat-sensitive pharmaceutical products.',
    modal: {
      subtitle: 'Temperature-Controlled Storage & Transport',
      sections: [
        {
          icon: '🏭',
          title: 'Cold Storage Facilities',
          points: [
            '2–8°C refrigerated storage for vaccines, insulin, and biologics',
            '-20°C deep freeze capacity for specialist and plasma-derived products',
            'Automated temperature logging with real-time alerts and alarms',
            'WHO pre-qualified cold-chain equipment and validated storage facilities',
          ],
        },
        {
          icon: '🚐',
          title: 'Transport & Compliance',
          points: [
            'Insulated packaging validated for 12–72 hour transit integrity',
            'Cold-chain certified last-mile delivery across all major Indian cities',
            'Temperature excursion reporting with documented corrective action protocols',
            'CDSCO-compliant cold-chain documentation for every temperature-sensitive shipment',
          ],
        },
      ],
    },
  },
  {
    icon: '📦',
    title: 'Inventory Management',
    desc: 'Managed inventory services that help our partners maintain optimal stock levels, reduce wastage, and prevent stockouts.',
    modal: {
      subtitle: 'Smart Stock Optimisation',
      sections: [
        {
          icon: '📊',
          title: 'Stock Optimisation',
          points: [
            'Data-driven demand forecasting to reduce overstock and costly stockouts',
            'Automated reorder triggers based on real consumption patterns',
            'Expiry management with 6-month advance alerts for near-expiry stock',
            'Vendor-managed inventory (VMI) programmes available for large accounts',
          ],
        },
        {
          icon: '🖥️',
          title: 'Reporting & Visibility',
          points: [
            'Real-time stock dashboard accessible 24/7 via the web portal',
            'Monthly consumption, variance, and wastage reports',
            'Integration support with leading hospital and pharmacy ERP systems',
            'Dedicated inventory analyst assigned to large and strategic accounts',
          ],
        },
      ],
    },
  },
  {
    icon: '🔍',
    title: 'Quality Assurance',
    desc: 'Every product is sourced from WHO-GMP certified manufacturers and undergoes quality checks before dispatch from our warehouses.',
    modal: {
      subtitle: 'Certified Quality at Every Step',
      sections: [
        {
          icon: '🏭',
          title: 'Sourcing & Verification',
          points: [
            'Products sourced exclusively from WHO-GMP and Schedule M certified manufacturers',
            'Certificate of Analysis (CoA) available on request for every product batch',
            'Annual supplier audit programme with documented on-site inspections',
            'Cold-chain integrity verified and recorded at every custody transfer point',
          ],
        },
        {
          icon: '🔬',
          title: 'In-Warehouse Quality Control',
          points: [
            'Physical inspection of each inbound consignment on receipt',
            'Quarantine hold process for any damaged, suspect, or unverified stock',
            'FEFO (First Expiry First Out) dispatch protocol strictly enforced',
            'Zero-tolerance policy for counterfeit, spurious, or substandard medicines',
          ],
        },
      ],
    },
  },
  {
    icon: '📋',
    title: 'Regulatory Compliance',
    desc: 'Full support with documentation, licensing, and regulatory submissions for import and domestic pharmaceutical procurement.',
    modal: {
      subtitle: 'End-to-End Regulatory Support',
      sections: [
        {
          icon: '📜',
          title: 'Licences & Permits',
          points: [
            'Full drug licence (Form 20 & 21) compliance maintained for all transactions',
            'Import permits and no-objection certificates (NOCs) procurement and management',
            'GST-compliant invoicing and automated e-way bill generation',
            'Narcotic and psychotropic substance (NDPS Act) handling licence held',
          ],
        },
        {
          icon: '📁',
          title: 'Documentation & Advisory',
          points: [
            'End-to-end dossier support for CDSCO import and domestic drug approvals',
            'Assistance with Schedule H, H1, and X product compliance requirements',
            'New product registration advisory for international and domestic manufacturers',
            'Ongoing regulatory change monitoring and proactive compliance updates',
          ],
        },
      ],
    },
  },
  {
    icon: '📞',
    title: '24/7 Customer Support',
    desc: 'Dedicated account managers and around-the-clock support for urgent orders, queries, and delivery tracking.',
    modal: {
      subtitle: 'Always-On Partner Support',
      sections: [
        {
          icon: '👤',
          title: 'Dedicated Account Management',
          points: [
            'Named account manager assigned to all Tier-1 and Tier-2 clients',
            'Dedicated WhatsApp and direct phone line for urgent order requests',
            'Proactive advance communication on supply disruptions or delays',
            'Quarterly business reviews and performance reporting sessions',
          ],
        },
        {
          icon: '📦',
          title: 'Order & Delivery Support',
          points: [
            'Round-the-clock order placement, modification, and cancellation support',
            'Real-time shipment tracking with live ETA and status updates',
            'Defined escalation matrix for critical or time-sensitive deliveries',
            'Post-delivery discrepancy resolution guaranteed within 24 business hours',
          ],
        },
      ],
    },
  },
];

const ServiceModal = ({ service, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const { modal } = service;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-4xl flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{service.title}</h2>
              <p className="text-base text-brand-600 font-medium mt-1">{modal.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-xl hover:bg-gray-100 flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 overflow-y-auto flex-1 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {modal.sections.map((section) => (
              <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                    {section.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug">{section.title}</h3>
                </div>
                <hr className="border-gray-100 mb-5" />
                <ul className="space-y-4">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <CheckIcon />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex-shrink-0 flex justify-end bg-white">
          <a
            href="/contact-us"
            className="btn-primary text-sm px-6 py-3 inline-flex items-center gap-2"
            onClick={onClose}
          >
            Enquire About This Service
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-16">
        <div className="page-container">
          <h1 className="text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-brand-100 text-lg max-w-xl">
            End-to-end pharmaceutical distribution services tailored to your needs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="card p-6 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-brand-200 group"
                onClick={() => setActiveService(s)}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  Learn more
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-600 text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-brand-100 mb-8 max-w-lg mx-auto">
            Our team works with your procurement and supply-chain team to design a tailored distribution plan.
          </p>
          <a href="/contact-us" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors inline-block">
            Talk to Our Team
          </a>
        </div>
      </section>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </>
  );
};

export default Services;
