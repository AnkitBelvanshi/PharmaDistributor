import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginForm from '../../components/forms/LoginForm';
import { useAuth } from '../../context/AuthContext';
import { APP_NAME } from '../../utils/constants';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/images/CrossMeds01.png" alt="CrossMeds Lifesciences logo" className="h-16 w-16 object-contain rounded-xl mx-auto" />
          <h1 className="mt-3 text-2xl font-bold text-gray-900">{APP_NAME}</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to the admin panel</p>
        </div>

        <div className="card p-8">
          <LoginForm onSubmit={handleSubmit} />
          <p className="text-center text-sm text-gray-500 mt-6">
            Need an account?{' '}
            <Link to="/register" className="text-brand-600 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-brand-600">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
