import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const userMeService = async () => {
  try {
    const response = await api.get<UserResponse>('/user-me');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
  }
};

export const updateUserProfile = async (params: {email: string}) => {
  try {
    const response = await api.post('/user-update', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
  }
};
