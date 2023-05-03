// import axios, { AxiosInstance } from "axios";
// import { getCookieValue, removeTokensFromCookie, setTokensInCookie } from "./cookies";

// const API: AxiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api/v1/",
//   headers: {
//     Accept: "application/json",
//   },
//   timeout: 10000, // 10 seconds
// });

// // Add a request interceptor
// API.interceptors.request.use(
//   (config) => {
//     const token = getCookieValue("access_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// API.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 403) {
//       try {
//         const refreshToken = getCookieValue("refresh_token");
//         const resp = await API.post("/auth/refresh", {
//           refreshToken,
//         });
//         setTokensInCookie(resp.access_token, resp.refresh_token);
//         originalRequest.headers.Authorization = `Bearer ${resp.accessToken}`;
//         return API(originalRequest);
//       } catch (err) {
//         removeTokensFromCookie()
//       }
//     }
//     return Promise.reject(error.response?.data);
//   }
// );

// const api = {
//   get: (url: string, params?: any) => {
//     return API.get(url, { params });
//   },
//   post: (url: string, data: any) => {
//     return API.post(url, data);
//   },
//   put: (url: string, data: any) => {
//     return API.put(url, data);
//   },
//   delete: (url: string) => {
//     return API.delete(url);
//   },
// };

// export default api;

import axios from "axios";
import {
  getCookieValue,
  removeTokensFromCookie,
  setTokensInCookie,
} from "./cookies";

const BASE_URL = "http://localhost:8080/api/v1/";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds
});

API.interceptors.request.use(async (config) => {
  const token = getCookieValue("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403) {
      try {
        const refreshToken = getCookieValue("refresh_token");
        const { data } = await API.post("/auth/refresh", {
          refreshToken,
        });
        setTokensInCookie(data.accessToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
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
