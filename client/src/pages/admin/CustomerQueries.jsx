import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getQueriesApi, deleteQueryApi } from '../../api/queryApi';
import SearchBar from '../../components/medicines/SearchBar';
import Pagination from '../../components/common/Pagination';
import { TableRowSkeleton } from '../../components/common/Loader';
import { formatDate } from '../../utils/formatters';

const CustomerQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchData = useCallback(async (page = 1, q = '') => {
    setLoading(true);
    try {
      const data = await getQueriesApi({ page, limit: 15, q });
      setQueries(data.queries);
      setPagination({ page: data.page, totalPages: data.totalPages, total: data.total });
    } catch {
      toast.error('Failed to load queries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(1, ''); }, [fetchData]);

  const handleSearch = useCallback((q) => {
    setQuery(q);
    fetchData(1, q);
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this query? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await deleteQueryApi(id);
      toast.success('Query deleted');
      fetchData(pagination.page, query);
    } catch {
      toast.error('Failed to delete query');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Queries</h1>
        <p className="text-gray-500 text-sm mt-1">{pagination.total} total submissions</p>
      </div>

      <div className="max-w-sm">
        <SearchBar onSearch={handleSearch} placeholder="Search by name or email…" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Name', 'Email', 'Phone', 'Location', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                : queries.map((q) => (
                    <>
                      <tr
                        key={q.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {q.firstName} {q.lastName}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{q.email}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{q.phone}</td>
                        <td className="px-4 py-3 text-gray-600">{q.location}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(q.createdAt)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(q.id); }}
                            disabled={deleting === q.id}
                            className="text-xs btn-danger py-1 px-3"
                          >
                            {deleting === q.id ? '…' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                      {expanded === q.id && q.message && (
                        <tr key={`${q.id}-msg`} className="bg-amber-50">
                          <td colSpan={6} className="px-4 py-3 text-sm text-gray-700 italic">
                            <strong>Message:</strong> {q.message}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
              {!loading && queries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No queries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={(p) => fetchData(p, query)} />
    </div>
  );
};

export default CustomerQueries;
