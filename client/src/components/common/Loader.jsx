const Loader = ({ size = 'md', className = '' }) => {
  const s = { sm: 'h-5 w-5 border-2', md: 'h-8 w-8 border-2', lg: 'h-12 w-12 border-4' }[size];
  return (
    <div className={`animate-spin rounded-full border-brand-200 border-t-brand-600 ${s} ${className}`} />
  );
};

export const PageLoader = ({ text = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <Loader size="lg" />
    <p className="text-sm text-gray-500">{text}</p>
  </div>
);

export const CardSkeleton = () => (
  <div className="card animate-pulse overflow-hidden">
    <div className="bg-gray-200 h-48" />
    <div className="p-4 space-y-2">
      <div className="bg-gray-200 rounded h-4 w-3/4" />
      <div className="bg-gray-200 rounded h-3 w-full" />
      <div className="bg-gray-200 rounded h-3 w-2/3" />
    </div>
  </div>
);

export const TableRowSkeleton = ({ cols = 4 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="bg-gray-200 rounded h-4" />
      </td>
    ))}
  </tr>
);

export default Loader;
