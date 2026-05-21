import { NavLink } from 'react-router-dom';
import { ADMIN_NAV_LINKS, APP_NAME } from '../../utils/constants';

const icons = {
  '/admin/dashboard': '🏠',
  '/admin/medicines': '💊',
  '/admin/add-medicine': '➕',
  '/admin/customer-queries': '📧',
  '/admin/profile': '👤',
};

const AdminSidebar = ({ isOpen, onClose }) => (
  <>
    {/* Backdrop (mobile) */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    )}

    {/* Sidebar panel */}
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 flex flex-col
        transform transition-transform duration-200
        lg:static lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-700">
        <img src="/images/CrossMeds01.png" alt="CrossMeds Lifesciences logo" className="h-8 w-8 object-contain rounded flex-shrink-0" />
        <span className="font-bold text-sm leading-tight">{APP_NAME}</span>
        <button
          className="ml-auto lg:hidden text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 mb-2">
          Admin Panel
        </p>
        {ADMIN_NAV_LINKS.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{icons[l.path]}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-gray-700 text-xs text-gray-500">
        CrossMeds Admin v1.0
      </div>
    </aside>
  </>
);

export default AdminSidebar;
