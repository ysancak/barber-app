import axios from 'axios';
import { store } from '../store';
import { setTokens, clearTokens } from '../slices/authSlice';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = state.auth.refreshToken;
      try {
        const { data } = await axios.post(`${API_BASE_URL}/refresh`, {
          token,
        });
        store.dispatch(setTokens(data));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearTokens());
      }
    }

    if (error.response.status === 401) {
      store.dispatch(clearTokens());
    }

    return Promise.reject(error);
  }
);

export default api;
