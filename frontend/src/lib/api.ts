import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JSON 工具 API
export const jsonApi = {
  format: (json: string, indent = 2) =>
    api.post('/api/tools/json/format', { json, indent }),

  minify: (json: string) => api.post('/api/tools/json/minify', { json }),

  validate: (json: string) => api.post('/api/tools/json/validate', { json }),

  toTypescript: (json: string, typeName = 'Root') =>
    api.post('/api/tools/json/to-typescript', { json, typeName }),
};

// PDF 工具 API
export const pdfApi = {
  toImages: (file: File, format = 'png', quality = 90) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/api/tools/pdf/to-images?format=${format}&quality=${quality}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getInfo: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/tools/pdf/info', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
