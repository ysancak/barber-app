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
    return response.data;
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
    //TODO: dönen nesneyi dön ve dispatch ile ekle
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminEditWorkerService = async (params: {
  worker: Worker;
  workerID: string;
}) => {
  try {
    const response = await api.post(
      `/edit-worker/${params.workerID}`,
      params.worker,
    );
    //TODO: dönen nesneyi dön ve dispatch ile ekle
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminDeleteWorkerService = async (workerID: string) => {
  try {
    const response = await api.post(`/delete-worker/${workerID}`);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetUpcomingDayOffsService = async () => {
  try {
    const response = await api.get<WorkerDayOff[]>('/upcomingHolidays');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminCreateDayOffService = async (dayoff: WorkerDayOff) => {
  try {
    const response = await api.post('/save-holiday', dayoff);
    //TODO: dönen nesneyi dön ve dispatch ile ekle
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminDeleteDayOffService = async (dayOffId: string) => {
  try {
    const response = await api.post(`/delete-holiday/${dayOffId}`);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminEditDayOffService = async (params: {
  dayOff: WorkerDayOff;
  dayOffId: string;
}) => {
  try {
    const response = await api.post(
      `/edit-holiday/${params.dayOffId}`,
      params.dayOff,
    );
    //TODO: dönen nesneyi dön ve dispatch ile ekle
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetPastDayOffsService = async () => {
  try {
    const response = await api.get<WorkerDayOff[]>('/pastHolidays');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};
