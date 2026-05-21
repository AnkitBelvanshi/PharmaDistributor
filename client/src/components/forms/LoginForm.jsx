import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Loader from '../common/Loader';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const LoginForm = ({ onSubmit, isRegister = false }) => {
  const extendedSchema = isRegister
    ? schema.extend({
        name: z.string().min(2, 'Name must be at least 2 characters').max(100),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
      }).refine((d) => d.password === d.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    : schema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(extendedSchema) });

  const Field = ({ id, label, type = 'text', placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={`input-field ${errors[id] ? 'input-error' : ''}`}
      />
      {errors[id] && (
        <p className="mt-1 text-xs text-red-600">{errors[id].message}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {isRegister && (
        <Field id="name" label="Full Name" placeholder="John Doe" />
      )}
      <Field id="email" label="Email address" type="email" placeholder="admin@example.com" />
      <Field id="password" label="Password" type="password" placeholder="••••••••" />
      {isRegister && (
        <Field id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" />
      )}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
        {isSubmitting && <Loader size="sm" className="border-white border-t-transparent" />}
        {isSubmitting ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginForm;
