// src/utils/axiosConfig.js

import axios from 'axios';

// Crear una instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto según tu configuración
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
