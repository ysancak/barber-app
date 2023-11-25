import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const getPopularSaloonsService = async () => {
  try {
    const response = await api.get<Saloon[]>('/popular-saloons');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
  }
};

export const getMapSaloonsService = async (params: {
  gender: string;
  category: string;
}) => {
  try {
    const response = await api.post<Saloon[]>('/listing-map', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
  }
};

export const getSaloonDetailService = async (params: {id: string}) => {
  try {
    const response = await api.get<SaloonDetail>(
      `/listing-detail/${params.id}`,
    );
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const toggleSaloonFavoriteService = async (params: {
  businessID: string;
}) => {
  try {
    await api.post('/mark-fav', params);
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const getFavoriteSaloonsService = async () => {
  try {
    const response = await api.get<Saloon[]>('/favorites');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSaloonWorkers = async (params: {businessID: string}) => {
  try {
    const response = await api.get<Worker[]>(`/workers/${params.businessID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWorkerCalendarEvents = async (params: {
  businessID: string;
  workerID: string;
  startDate: string;
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        events: [
          {
            start: '2023-11-25T11:30:00.000+00:00',
            end: '2023-11-25T12:30:00.000+00:00',
          },
        ],
        hours: {
          '0': {start: '12:00', end: '19:00', offday: 'offday'},
          '1': {start: '12:00', end: '19:00', offday: 'offday'},
          '2': {start: '12:00', end: '19:00', offday: 'offday'},
          '3': {start: '12:00', end: '19:00', offday: 'offday'},
          '5': {start: '05:00', end: '11:00', offday: 'offday'},
        },
      });
    }, 600);
  });

  try {
    const response = await api.get<Worker[]>(
      `/get-calendar-data-worker/${params.businessID}/${params.workerID}/${params.startDate}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
