import api from './axiosInstance';

export const submitContactApi = (data) =>
  api.post('/contact', data).then((r) => r.data);

export const getQueriesApi = ({ page = 1, limit = 15, q = '' } = {}) =>
  api.get('/admin/queries', { params: { page, limit, q } }).then((r) => r.data);

export const deleteQueryApi = (id) =>
  api.delete(`/admin/queries/${id}`).then((r) => r.data);

export const getAdminStatsApi = () =>
  api.get('/admin/stats').then((r) => r.data);
