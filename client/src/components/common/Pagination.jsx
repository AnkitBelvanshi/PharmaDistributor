const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="btn-secondary disabled:opacity-40 text-sm py-1.5 px-4"
      >
        ← Prev
      </button>
      <span className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{page}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="btn-secondary disabled:opacity-40 text-sm py-1.5 px-4"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
