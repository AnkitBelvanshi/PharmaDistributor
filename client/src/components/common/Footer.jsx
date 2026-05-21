import { Link } from 'react-router-dom';
import { APP_NAME, NAV_LINKS } from '../../utils/constants';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="page-container py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <img src="/images/Lifecare.jpg" alt="Lifecare logo" className="h-10 w-10 object-contain rounded bg-white p-0.5" />
            <span className="font-bold text-white">{APP_NAME}</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Your trusted pharmaceutical distribution partner, delivering quality medicines
            across the country with reliability and care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📧 info@lifecaresolutions.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Mumbai, Maharashtra, India</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-800">
      <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">Pharmaceutical Distribution Services</p>
      </div>
    </div>
  </footer>
);

export default Footer;
