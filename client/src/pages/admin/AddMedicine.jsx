import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MedicineForm from '../../components/forms/MedicineForm';
import { createMedicineApi } from '../../api/medicineApi';

const AddMedicine = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createMedicineApi(formData);
      toast.success('Medicine added successfully');
      navigate('/admin/medicines');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create medicine');
      throw err;
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Medicine</h1>
        <p className="text-gray-500 text-sm mt-1">Add a new medicine to the catalogue</p>
      </div>
      <div className="card p-6 sm:p-8">
        <MedicineForm onSubmit={handleSubmit} submitLabel="Add Medicine" />
      </div>
    </div>
  );
};

export default AddMedicine;
