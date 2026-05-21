import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMedicinesApi, deleteMedicineApi, searchMedicinesApi } from '../../api/medicineApi';
import SearchBar from '../../components/medicines/SearchBar';
import Pagination from '../../components/common/Pagination';
import { TableRowSkeleton } from '../../components/common/Loader';
import { getImageUrl, getServerImageUrl, formatDate } from '../../utils/formatters';

const MedicineThumb = ({ name, filename }) => {
  const [failed, setFailed] = useState(false);
  const src = failed ? null : getImageUrl(filename, name);

  const handleError = (e) => {
    const serverUrl = getServerImageUrl(filename);
    if (serverUrl && e.target.src !== serverUrl) {
      e.target.src = serverUrl;
    } else {
      setFailed(true);
    }
  };

  return src ? (
    <img
      src={src}
      alt={name}
      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
      onError={handleError}
    />
  ) : (
    <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-xl">💊</div>
  );
};

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchData = useCallback(async (page = 1, q = '') => {
    setLoading(true);
    try {
      const fn = q ? () => searchMedicinesApi({ q, page }) : () => getMedicinesApi({ page });
      const data = await fn();
      setMedicines(data.medicines);
      setPagination({ page: data.page, totalPages: data.totalPages, total: data.total });
    } catch {
      toast.error('Failed to load medicines');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(1, ''); }, [fetchData]);

  const handleSearch = useCallback((q) => {
    setQuery(q);
    fetchData(1, q);
  }, [fetchData]);

  const handlePageChange = (page) => fetchData(page, query);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteMedicineApi(id);
      toast.success(`"${name}" deleted`);
      fetchData(pagination.page, query);
    } catch {
      toast.error('Failed to delete medicine');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Medicines</h1>
          <p className="text-gray-500 text-sm mt-1">{pagination.total} medicines total</p>
        </div>
        <Link to="/admin/add-medicine" className="btn-primary text-sm">+ Add Medicine</Link>
      </div>

      <div className="max-w-sm">
        <SearchBar onSearch={handleSearch} placeholder="Search medicines…" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Image', 'Name', 'Added', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                : medicines.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <MedicineThumb name={m.name} filename={m.image} />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(m.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/edit-medicine/${m.id}`}
                            className="text-xs btn-secondary py-1 px-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(m.id, m.name)}
                            disabled={deleting === m.id}
                            className="text-xs btn-danger py-1 px-3"
                          >
                            {deleting === m.id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!loading && medicines.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-400">
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ManageMedicines;
