import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://freelance-portfolio-backend-api.onrender.com';

const api = axios.create({ baseURL: API_BASE });

export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const submitContact = (data) => api.post('/contact', data);
export const createPaymentOrder = (data) => api.post('/payment/create-order', data);
export const verifyPayment = (data) => api.post('/payment/verify', data);
export const createProject = (data) => api.post('/projects', data);

export default api;
