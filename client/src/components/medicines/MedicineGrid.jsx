import MedicineCard from './MedicineCard';
import { CardSkeleton } from '../common/Loader';

const MedicineGrid = ({ medicines, loading, skeletonCount = 8 }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!medicines?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <span className="text-5xl">🔍</span>
        <p className="text-gray-500 text-lg">No medicines found</p>
        <p className="text-gray-400 text-sm">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {medicines.map((m) => (
        <MedicineCard key={m.id} medicine={m} />
      ))}
    </div>
  );
};

export default MedicineGrid;
