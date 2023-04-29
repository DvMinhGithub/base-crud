import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 10000, // 10 seconds
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

const api = {
  get: (url: string, params?: any) => {
    return API.get(url, { params });
  },
  post: (url: string, data: any) => {
    return API.post(url, data);
  },
  put: (url: string, data: any) => {
    return API.put(url, data);
  },
  delete: (url: string) => {
    return API.delete(url);
  },
};

export default api;
