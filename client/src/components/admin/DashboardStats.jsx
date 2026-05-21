const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="card p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-0.5">{value ?? '—'}</p>
    </div>
  </div>
);

const DashboardStats = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <StatCard
      title="Total Medicines"
      value={stats?.medicinesCount}
      icon="💊"
      colorClass="bg-blue-50"
    />
    <StatCard
      title="Customer Queries"
      value={stats?.queriesCount}
      icon="📧"
      colorClass="bg-green-50"
    />
    <StatCard
      title="Recent Queries"
      value={stats?.recentQueries?.length}
      icon="🕐"
      colorClass="bg-amber-50"
    />
  </div>
);

export default DashboardStats;
