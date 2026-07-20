import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, DetectionResult } from '../types';

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/** 上传文件检测 */
export async function detectByFile(file: File): Promise<ApiResponse<DetectionResult>> {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post('/detect/file', formData);
}

/** 粘贴文本检测 */
export async function detectByText(text: string): Promise<ApiResponse<DetectionResult>> {
  const formData = new FormData();
  formData.append('text', text);
  return axiosInstance.post('/detect/text', formData);
}

export default axiosInstance;
