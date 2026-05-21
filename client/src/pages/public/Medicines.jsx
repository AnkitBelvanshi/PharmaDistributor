import { useCallback, useState } from 'react';
import useMedicines from '../../hooks/useMedicines';
import MedicineGrid from '../../components/medicines/MedicineGrid';
import SearchBar from '../../components/medicines/SearchBar';
import Pagination from '../../components/common/Pagination';

const Medicines = () => {
  const [query, setQuery] = useState('');
  const { medicines, loading, error, pagination, fetchMedicines, searchMedicines } = useMedicines(1);

  const handleSearch = useCallback(
    (q) => {
      setQuery(q);
      if (q) searchMedicines(q, 1);
      else fetchMedicines(1);
    },
    [searchMedicines, fetchMedicines]
  );

  const handlePageChange = (page) => {
    if (query) searchMedicines(query, page);
    else fetchMedicines(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-container py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title mb-1">Medicine Catalogue</h1>
        <p className="text-gray-500">
          {query
            ? `Showing results for "${query}"`
            : `${pagination.total} medicines available`}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-lg mb-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by medicine name…"
          initialValue={query}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Grid */}
      <MedicineGrid medicines={medicines} loading={loading} />

      {/* Pagination */}
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Medicines;
