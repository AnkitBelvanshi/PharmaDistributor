const importDocs = [
  'Valid Drug Licence (Form 20 & 21 or Form 20B & 21B)',
  'GST Registration Certificate',
  'PAN Card of the proprietor / company',
  'Aadhaar / Company Incorporation Certificate',
  'Signed Partnership / Distributor Agreement',
  'Cold-chain compliance certificate (for temperature-sensitive products)',
];

const orderRequirements = [
  { label: 'Minimum Order Value', value: '₹10,000 per order' },
  { label: 'Lead Time (standard)', value: '1–3 business days' },
  { label: 'Lead Time (emergency)', value: 'Same day (subject to availability)' },
  { label: 'Payment Terms', value: '30/60/90 days credit (post approval)' },
  { label: 'Advance Payment Discount', value: 'Up to 2.5% on prepaid orders' },
  { label: 'Returns Policy', value: 'Accepted within 7 days for damaged / wrong items' },
];

const Requirements = () => (
  <>
    <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-16">
      <div className="page-container">
        <h1 className="text-4xl font-bold mb-3">Business Requirements</h1>
        <p className="text-brand-100 text-lg max-w-xl">
          Everything you need to know to become a CrossMeds Lifesciences distribution partner.
        </p>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="page-container max-w-4xl">
        {/* Licensing docs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Required Documentation</h2>
          <p className="text-gray-500 mb-6">
            To on-board as a distributor or retailer, please provide the following documents:
          </p>
          <ul className="space-y-3">
            {importDocs.map((d, i) => (
              <li key={i} className="flex items-start gap-3 card p-4">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-700 text-sm">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Order requirements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Terms</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {orderRequirements.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-5 py-3 font-medium text-gray-700 w-1/2">{r.label}</td>
                    <td className="px-5 py-3 text-gray-600">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Process */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">On-boarding Process</h2>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Submit Enquiry', desc: 'Fill the contact form or call our business development team.' },
              { step: '02', title: 'Document Verification', desc: 'Our compliance team reviews your licensing and KYC documents.' },
              { step: '03', title: 'Agreement Signing', desc: 'Sign the distribution / supply agreement and set up your account.' },
              { step: '04', title: 'First Order & Credit Setup', desc: 'Place your first order and we set up your credit terms based on history.' },
            ].map((p) => (
              <div key={p.step} className="flex items-start gap-4 card p-5">
                <span className="text-3xl font-bold text-brand-100 flex-shrink-0">{p.step}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Requirements;
