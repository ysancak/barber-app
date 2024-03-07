import axios from 'axios';

import {resetNavigationState} from '@/router/root.navigation';
import {store} from '@/store';
import {setTokens, clearTokens} from '@/store/auth';
import {API_BASE_URL} from '@/utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config: any) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    const state = store.getState();

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = state.auth.refreshToken;
      const authType = state.auth.authType;
      try {
        const refreshUrl =
          authType === 'Admin'
            ? `${API_BASE_URL}/refresh-admin`
            : `${API_BASE_URL}/refresh`;
        const {data} = await axios.post(refreshUrl, {
          token,
        });
        store.dispatch(setTokens(data));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearTokens());
        if (authType === 'Admin') {
          resetNavigationState({
            index: 1,
            routes: [{name: 'Tabs'}],
          });
        }
      }
    }
    if (error.response.status === 401) {
      store.dispatch(clearTokens());
    }
    return Promise.reject(error);
  },
);

export default api;
