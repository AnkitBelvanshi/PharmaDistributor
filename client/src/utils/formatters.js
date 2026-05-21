export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const truncate = (str, n = 120) => {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '…' : str;
};

export const getImageUrl = (filename) => {
  if (!filename) return null;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const serverRoot = apiUrl.replace(/\/api\/?$/, '');
  return `${serverRoot}/uploads/${filename}`;
};
