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
    const response = await api.post<Worker>('/save-worker', worker);
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
    const response = await api.post<Worker>(
      `/edit-worker/${params.workerID}`,
      params.worker,
    );
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
    const response = await api.post<WorkerDayOff>('/save-holiday', dayoff);
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
    const response = await api.post<WorkerDayOff>(
      `/edit-holiday/${params.dayOffId}`,
      params.dayOff,
    );
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
