import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';
import Loader from '../common/Loader';

const schema = z.object({
  firstName: z.string().min(1, 'Required').max(100),
  lastName: z.string().min(1, 'Required').max(100),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\+?[\d\s\-()+]{10,15}$/, 'Invalid phone number'),
  location: z.string().min(2, 'Required').max(200),
  message: z.string().max(2000).optional(),
  recaptchaToken: z.string().min(1, 'Please complete the reCAPTCHA'),
});

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

const Field = ({ id, label, register, errors, required, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {errors[id] && <p className="mt-1 text-xs text-red-600">{errors[id].message}</p>}
  </div>
);

const ContactForm = ({ onSubmit }) => {
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const handleCaptcha = (token) => setValue('recaptchaToken', token || '');

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    captchaRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="firstName" label="First Name" errors={errors} required>
          <input
            id="firstName"
            {...register('firstName')}
            className={`input-field ${errors.firstName ? 'input-error' : ''}`}
            placeholder="John"
          />
        </Field>
        <Field id="lastName" label="Last Name" errors={errors} required>
          <input
            id="lastName"
            {...register('lastName')}
            className={`input-field ${errors.lastName ? 'input-error' : ''}`}
            placeholder="Doe"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="email" label="Email" errors={errors} required>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`input-field ${errors.email ? 'input-error' : ''}`}
            placeholder="john@example.com"
          />
        </Field>
        <Field id="phone" label="Phone" errors={errors} required>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`input-field ${errors.phone ? 'input-error' : ''}`}
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field id="location" label="Location / City" errors={errors} required>
        <input
          id="location"
          {...register('location')}
          className={`input-field ${errors.location ? 'input-error' : ''}`}
          placeholder="Mumbai, Maharashtra"
        />
      </Field>

      <Field id="message" label="Message" errors={errors}>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="input-field resize-none"
          placeholder="Tell us about your requirement…"
        />
      </Field>

      {/* reCAPTCHA */}
      <div>
        {SITE_KEY ? (
          <ReCAPTCHA ref={captchaRef} sitekey={SITE_KEY} onChange={handleCaptcha} onExpired={() => setValue('recaptchaToken', '')} />
        ) : (
          <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
            reCAPTCHA site key not configured. Set <code>VITE_RECAPTCHA_SITE_KEY</code> in <code>.env</code>.
          </div>
        )}
        {errors.recaptchaToken && (
          <p className="mt-1 text-xs text-red-600">{errors.recaptchaToken.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting || !SITE_KEY} className="btn-primary w-full sm:w-auto">
        {isSubmitting && <Loader size="sm" className="border-white border-t-transparent" />}
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
