import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginForm from '../../components/forms/LoginForm';
import { registerApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { APP_NAME } from '../../utils/constants';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async ({ name, email, password }) => {
    try {
      await registerApi({ name, email, password });
      toast.success('Account created! Please sign in.');
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/CrossMeds01.png" alt="CrossMeds Lifesciences logo" className="h-16 w-16 object-contain rounded-xl mx-auto" />
          <h1 className="mt-3 text-2xl font-bold text-gray-900">{APP_NAME}</h1>
          <p className="text-gray-500 text-sm mt-1">Create an admin account</p>
        </div>

        <div className="card p-8">
          <LoginForm onSubmit={handleSubmit} isRegister />
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 hover:underline font-medium">
              Sign in
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

export default Register;
