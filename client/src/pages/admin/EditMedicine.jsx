import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MedicineForm from '../../components/forms/MedicineForm';
import { getMedicineByIdApi, updateMedicineApi } from '../../api/medicineApi';
import { PageLoader } from '../../components/common/Loader';

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMedicineByIdApi(id)
      .then(setMedicine)
      .catch(() => {
        toast.error('Medicine not found');
        navigate('/admin/medicines');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await updateMedicineApi(id, formData);
      toast.success('Medicine updated successfully');
      navigate('/admin/medicines');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update medicine');
      throw err;
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Medicine</h1>
        <p className="text-gray-500 text-sm mt-1">Update details for "{medicine?.name}"</p>
      </div>
      <div className="card p-6 sm:p-8">
        <MedicineForm
          defaultValues={medicine}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditMedicine;
