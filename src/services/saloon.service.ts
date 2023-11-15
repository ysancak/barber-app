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
