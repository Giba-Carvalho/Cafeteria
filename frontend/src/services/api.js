import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response) {
      // Erro de resposta do servidor
      const { status, data } = error.response;
      console.error(`Server error ${status}:`, data);
    } else if (error.request) {
      // Erro de rede
      console.error('Network error:', error.request);
    } else {
      // Outro tipo de erro
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
