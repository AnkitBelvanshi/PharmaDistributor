import toast from 'react-hot-toast';
import ContactForm from '../../components/forms/ContactForm';
import { submitContactApi } from '../../api/queryApi';

const Contact = () => {
  const handleSubmit = async (data) => {
    try {
      await submitContactApi(data);
      toast.success("Message sent! We'll get back to you shortly.");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
      throw err;
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-16">
        <div className="page-container">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-brand-100 text-lg max-w-xl">
            Have a question or want to become a distribution partner? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our business development team typically responds within 24 hours on business days.
                </p>
              </div>
              {[
                { icon: '📧', label: 'Email', value: 'info@lifecaresolutions.com' },
                { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
                { icon: '📱', label: 'WhatsApp', value: '+91 98765 43210' },
                { icon: '📍', label: 'Address', value: '123 Pharma Hub, Andheri East, Mumbai 400069' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 9 AM – 6 PM' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{c.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{c.label}</p>
                    <p className="text-sm text-gray-700 mt-0.5">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <ContactForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
