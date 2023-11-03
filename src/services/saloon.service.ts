import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const getPopularSaloonsService = async () => {
  try {
    const response = await api.get<Saloon[]>('/popular-saloons');
    return response.data.popularBusinesses;
  } catch (error) {
    showAPIErrorToast(error);
  }
};
