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
