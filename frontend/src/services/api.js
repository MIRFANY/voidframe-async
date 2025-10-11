// Simple API client for frontend to call backend endpoints
import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000' });

export default {
  uploadDpr(formData) { return api.post('/api/dpr/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); },
  getDpr(id) { return api.get(`/api/dpr/${id}`); },
  predict(features) { return api.post('/api/ml/predict', features); }
};
