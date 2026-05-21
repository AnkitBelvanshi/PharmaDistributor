import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { updateProfileApi, deleteAccountApi } from '../../api/authApi';
import Loader from '../../components/common/Loader';

const profileSchema = z.object({
  name: z.string().min(2).max(100).optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  password: z.string().min(8, 'Min 8 characters').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((d) => !d.password || d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [deletingAccount, setDeletingAccount] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const onSubmit = async (data) => {
    const payload = {};
    if (data.name && data.name !== user?.name) payload.name = data.name;
    if (data.email && data.email !== user?.email) payload.email = data.email;
    if (data.password) payload.password = data.password;

    if (!Object.keys(payload).length) {
      toast('No changes to save');
      return;
    }

    try {
      await updateProfileApi(payload);
      toast.success('Profile updated');
      reset({ name: data.name || user?.name, email: data.email || user?.email, password: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Delete your account permanently? This cannot be undone.')) return;
    setDeletingAccount(true);
    try {
      await deleteAccountApi();
      await logout();
      toast.success('Account deleted');
      navigate('/login', { replace: true });
    } catch {
      toast.error('Failed to delete account');
      setDeletingAccount(false);
    }
  };

  const Field = ({ id, label, type = 'text', placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={`input-field ${errors[id] ? 'input-error' : ''}`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-600">{errors[id].message}</p>}
    </div>
  );

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Update your account details</p>
      </div>

      {/* Current info */}
      <div className="card p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-2xl font-bold text-brand-600">
          {user?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Edit form */}
      <div className="card p-6 sm:p-8">
        <h2 className="font-semibold text-gray-800 mb-6">Update Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Field id="name" label="Full Name" placeholder={user?.name} />
          <Field id="email" label="Email Address" type="email" placeholder={user?.email} />
          <hr className="border-gray-100" />
          <p className="text-xs text-gray-400">Leave password fields blank to keep current password.</p>
          <Field id="password" label="New Password" type="password" placeholder="Min 8 characters" />
          <Field id="confirmPassword" label="Confirm New Password" type="password" placeholder="Repeat new password" />

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
            {isSubmitting && <Loader size="sm" className="border-white border-t-transparent" />}
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="card p-6 border-red-200 bg-red-50">
        <h2 className="font-semibold text-red-800 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-600 mb-4">
          Permanently delete your admin account. This action cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
          className="btn-danger text-sm"
        >
          {deletingAccount && <Loader size="sm" className="border-white border-t-transparent" />}
          {deletingAccount ? 'Deleting…' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
