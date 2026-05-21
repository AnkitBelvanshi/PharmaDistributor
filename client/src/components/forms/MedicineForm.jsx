import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getImageUrl } from '../../utils/formatters';
import Loader from '../common/Loader';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const MedicineForm = ({ defaultValues, onSubmit, submitLabel = 'Save Medicine' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: defaultValues?.name || '', description: defaultValues?.description || '' },
  });

  const fileRef = useRef(null);
  const [preview, setPreview] = useState(
    defaultValues?.image ? getImageUrl(defaultValues.image) : null
  );
  const [imageFile, setImageFile] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => () => { if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview); }, [preview]);

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (imageFile) formData.append('image', imageFile);
    return onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Medicine Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Amoxicillin"
          {...register('name')}
          className={`input-field ${errors.name ? 'input-error' : ''}`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Detailed description of the medicine…"
          {...register('description')}
          className={`input-field resize-none ${errors.description ? 'input-error' : ''}`}
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medicine Image {!defaultValues?.image && <span className="text-gray-400">(optional)</span>}
        </label>
        <div className="flex items-start gap-4">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200 flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="btn-secondary text-sm"
            >
              {preview ? 'Change image' : 'Upload image'}
            </button>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP · Max 5 MB</p>
          </div>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting && <Loader size="sm" className="border-white border-t-transparent" />}
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
};

export default MedicineForm;
