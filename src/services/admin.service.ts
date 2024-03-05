import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const loginAdminService = async (params: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post<AuthResponse>('/admin-signin', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminBusinessDetailService = async () => {
  try {
    const response = await api.get<Saloon>('/getBusiness');
    // FIXME: Burada array değil tek bir salon gelmeli
    return response.data[0] as Saloon;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetWorkersService = async () => {
  try {
    const response = await api.get<Worker[]>('/allWorkers');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminCreateWorkerService = async (worker: Worker) => {
  try {
    const response = await api.post('/save-worker', worker);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};
