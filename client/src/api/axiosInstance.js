import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Module-level token store (memory-only — not persisted to localStorage)
let _accessToken = null;
let _refreshPromise = null;

export const setToken = (token) => { _accessToken = token; };
export const clearToken = () => { _accessToken = null; };
export const getToken = () => _accessToken;

// Attach Bearer token on every request
axiosInstance.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

// Auto-refresh on 401 TOKEN_EXPIRED
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !original._retry
    ) {
      original._retry = true;

      // Deduplicate concurrent refresh calls
      if (!_refreshPromise) {
        _refreshPromise = axiosInstance
          .post('/auth/refresh')
          .then((res) => {
            setToken(res.data.accessToken);
            return res.data.accessToken;
          })
          .finally(() => { _refreshPromise = null; });
      }

      try {
        const newToken = await _refreshPromise;
        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      } catch {
        clearToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
