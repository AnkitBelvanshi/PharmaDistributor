import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedMedicinesApi } from '../../api/medicineApi';
import MedicineGrid from '../../components/medicines/MedicineGrid';
import Carousel from '../../components/common/Carousel';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedMedicinesApi()
      .then(setFeatured)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero Carousel */}
      <Carousel />

      {/* Hero text strip below carousel */}
      <section className="bg-brand-700 text-white">
        <div className="page-container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{APP_NAME}</h1>
              <p className="text-brand-100 mt-1">{APP_TAGLINE}</p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link to="/medicines" className="bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-50 transition-colors text-sm">
                Browse Medicines
              </Link>
              <Link to="/contact-us" className="border border-white/40 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="page-container py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Medicines Available', value: '500+' },
              { label: 'Cities Served', value: '50+' },
              { label: 'Healthcare Partners', value: '1,200+' },
              { label: 'Years of Experience', value: '15+' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-brand-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-16 bg-gray-50">
        <div className="page-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Medicines</h2>
              <p className="text-gray-500 mt-1">Top products from our catalogue</p>
            </div>
            <Link to="/medicines" className="btn-secondary text-sm hidden sm:inline-flex">
              View all →
            </Link>
          </div>
          <MedicineGrid medicines={featured} loading={loading} skeletonCount={6} />
          <div className="mt-8 text-center sm:hidden">
            <Link to="/medicines" className="btn-secondary">
              View all medicines →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <h2 className="section-title text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Fast Delivery', desc: 'Reliable same-day and next-day delivery to healthcare facilities across the country.' },
              { icon: '✅', title: 'Quality Assured', desc: 'All medicines are sourced from certified manufacturers and comply with regulatory standards.' },
              { icon: '💰', title: 'Competitive Pricing', desc: 'Best prices for bulk and regular orders with flexible payment terms for our partners.' },
              { icon: '📞', title: '24/7 Support', desc: 'Dedicated support team available round the clock for order queries and emergencies.' },
              { icon: '🏥', title: 'Wide Network', desc: 'Serving hospitals, clinics, pharmacies, and nursing homes across 50+ cities.' },
              { icon: '🔒', title: 'Secure & Compliant', desc: 'Fully licensed and compliant with all pharmaceutical distribution regulations.' },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 text-white py-16">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to partner with us?</h2>
          <p className="text-brand-100 mb-8 max-w-lg mx-auto">
            Get in touch with our team to discuss your pharmaceutical supply requirements.
          </p>
          <Link to="/contact-us" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
