import api from './axiosInstance';

export const registerApi = (data) =>
  api.post('/auth/register', data).then((r) => r.data);

export const loginApi = (data) =>
  api.post('/auth/login', data).then((r) => r.data);

export const logoutApi = () =>
  api.post('/auth/logout').then((r) => r.data);

export const refreshTokenApi = () =>
  api.post('/auth/refresh').then((r) => r.data);

export const getMeApi = () =>
  api.get('/auth/me').then((r) => r.data);

export const updateProfileApi = (data) =>
  api.put('/auth/profile', data).then((r) => r.data);

export const deleteAccountApi = () =>
  api.delete('/auth/account').then((r) => r.data);
