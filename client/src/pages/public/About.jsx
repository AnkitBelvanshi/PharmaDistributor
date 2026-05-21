const About = () => (
  <>
    {/* Hero */}
    <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-16">
      <div className="page-container">
        <h1 className="text-4xl font-bold mb-3">About Us</h1>
        <p className="text-brand-100 text-lg max-w-xl">
          Learn about CrossMeds Lifesciences and our commitment to quality pharmaceutical distribution.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="py-16 bg-white">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3 block">Our Mission</span>
            <h2 className="section-title mb-4">Delivering Healthcare, Delivering Hope</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              CrossMeds Lifesciences was founded with a single mission: to ensure that quality
              pharmaceutical products reach every corner of the country — reliably, affordably, and on time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Over 15 years, we have grown from a regional distributor into a nationwide network serving
              hospitals, clinics, pharmacies, and nursing homes across India. Every order we fulfil is a
              promise we keep to the patients who depend on these medicines.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[ ['50+', 'Cities Served'], ['500+', 'Medicines'], ['15+', 'Years Experience']].map(([v, l]) => (
                <div key={l} className="card p-4 text-center">
                  <p className="text-2xl font-bold text-brand-600">{v}</p>
                  <p className="text-xs text-gray-500 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-2xl bg-brand-50 flex items-center justify-center text-8xl">
              💊
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-gray-50">
      <div className="page-container">
        <h2 className="section-title text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🎯', title: 'Integrity', desc: 'Transparent dealings with every supplier, partner, and client.' },
            { icon: '⚡', title: 'Reliability', desc: 'Consistent, on-time fulfilment you can build your supply chain on.' },
            { icon: '🌿', title: 'Quality', desc: 'Only certified, standard-compliant medicines leave our warehouses.' },
            { icon: '🤝', title: 'Partnership', desc: 'We grow when our healthcare partners grow — long-term relationships first.' },
          ].map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications */}
    <section className="py-16 bg-white">
      <div className="page-container text-center">
        <h2 className="section-title mb-4">Licensed & Certified</h2>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto">
          We operate fully in compliance with all applicable pharmaceutical distribution regulations and hold the following certifications:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['CDSCO Licensed', 'GST Registered', 'ISO 9001:2015', 'WHO-GMP Compliant', 'Drug Licence Holder'].map((c) => (
            <span key={c} className="bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-4 py-2 rounded-full">
              ✓ {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
