const services = [
  {
    icon: '🚚',
    title: 'Bulk Distribution',
    desc: 'Large-volume pharmaceutical distribution to hospitals, government institutions, and pharmacy chains. Flexible MOQs and competitive pricing on bulk orders.',
  },
  {
    icon: '🏥',
    title: 'Hospital Supply',
    desc: 'Dedicated supply chain solutions for hospitals and healthcare systems — including scheduled deliveries, formulary management, and emergency restocking.',
  },
  {
    icon: '💊',
    title: 'Retail Pharmacy Supply',
    desc: 'Reliable next-day and same-day supply for independent pharmacies and retail chains, with an extensive catalogue covering OTC and prescription medicines.',
  },
  {
    icon: '❄️',
    title: 'Cold-Chain Logistics',
    desc: 'Temperature-controlled storage and transport for vaccines, biologics, and other heat-sensitive pharmaceutical products.',
  },
  {
    icon: '📦',
    title: 'Inventory Management',
    desc: 'Managed inventory services that help our partners maintain optimal stock levels, reduce wastage, and prevent stockouts.',
  },
  {
    icon: '🔍',
    title: 'Quality Assurance',
    desc: 'Every product is sourced from WHO-GMP certified manufacturers and undergoes quality checks before dispatch from our warehouses.',
  },
  {
    icon: '📋',
    title: 'Regulatory Compliance',
    desc: 'Full support with documentation, licensing, and regulatory submissions for import and domestic pharmaceutical procurement.',
  },
  {
    icon: '📞',
    title: '24/7 Customer Support',
    desc: 'Dedicated account managers and around-the-clock support for urgent orders, queries, and delivery tracking.',
  },
];

const Services = () => (
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
            <div key={s.title} className="card p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
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
  </>
);

export default Services;
