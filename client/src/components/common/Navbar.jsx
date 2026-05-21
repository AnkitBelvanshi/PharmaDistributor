import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NAV_LINKS, APP_NAME } from '../../utils/constants';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/Lifecare.jpg" alt="Lifecare logo" className="h-10 w-10 object-contain rounded" />
            <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.path} to={l.path} end={l.path === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/admin/dashboard" className="btn-secondary text-sm py-1.5 px-3">
                  Admin
                </Link>
                <button onClick={handleLogout} className="btn-primary text-sm py-1.5 px-3">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-1.5 px-3">
                Admin Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden py-4 border-t border-gray-100 space-y-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2 px-3">
              {isAuthenticated ? (
                <>
                  <Link to="/admin/dashboard" className="btn-secondary text-sm" onClick={() => setOpen(false)}>
                    Admin Panel
                  </Link>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="btn-primary text-sm">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-primary text-sm" onClick={() => setOpen(false)}>
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
