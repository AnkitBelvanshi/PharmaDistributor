import api from './axiosInstance';

export const getMedicinesApi = ({ page = 1, limit = 12 } = {}) =>
  api.get('/medicines', { params: { page, limit } }).then((r) => r.data);

export const getFeaturedMedicinesApi = () =>
  api.get('/medicines/featured').then((r) => r.data);

export const searchMedicinesApi = ({ q = '', page = 1, limit = 12 } = {}) =>
  api.get('/medicines/search', { params: { q, page, limit } }).then((r) => r.data);

export const getMedicineByIdApi = (id) =>
  api.get(`/medicines/${id}`).then((r) => r.data);

export const createMedicineApi = (formData) =>
  api.post('/medicines', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);

export const updateMedicineApi = (id, formData) =>
  api.put(`/medicines/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);

export const deleteMedicineApi = (id) =>
  api.delete(`/medicines/${id}`).then((r) => r.data);
