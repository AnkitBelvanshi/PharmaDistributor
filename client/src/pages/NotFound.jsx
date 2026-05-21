import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
    <div className="text-8xl mb-6">💊</div>
    <h1 className="text-8xl font-bold text-brand-600 mb-2">404</h1>
    <h2 className="text-2xl font-semibold text-gray-900 mb-3">Page Not Found</h2>
    <p className="text-gray-500 max-w-sm mb-8">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <div className="flex flex-wrap gap-3 justify-center">
      <Link to="/" className="btn-primary">Go to Home</Link>
      <Link to="/medicines" className="btn-secondary">Browse Medicines</Link>
    </div>
  </div>
);

export default NotFound;
