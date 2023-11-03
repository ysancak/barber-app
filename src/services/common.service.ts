import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const getFaqService = async () => {
  try {
    const response = await api.get<FaqResponse[]>('/faq');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
  }
};
