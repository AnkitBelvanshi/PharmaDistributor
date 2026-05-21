import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStatsApi } from '../../api/queryApi';
import DashboardStats from '../../components/admin/DashboardStats';
import { PageLoader } from '../../components/common/Loader';
import { formatDate } from '../../utils/formatters';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStatsApi()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your pharmaceutical catalogue and queries</p>
      </div>

      <DashboardStats stats={stats} />

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/add-medicine" className="btn-primary text-sm">+ Add Medicine</Link>
          <Link to="/admin/medicines" className="btn-secondary text-sm">Manage Medicines</Link>
          <Link to="/admin/customer-queries" className="btn-secondary text-sm">View Queries</Link>
        </div>
      </div>

      {/* Recent queries */}
      {stats?.recentQueries?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Customer Queries</h2>
            <Link to="/admin/customer-queries" className="text-sm text-brand-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Email', 'Location', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentQueries.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {q.firstName} {q.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{q.email}</td>
                    <td className="px-4 py-3 text-gray-600">{q.location}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(q.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
