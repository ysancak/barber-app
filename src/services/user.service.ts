import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const loginService = async (params: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post<AuthResponse>('/signin', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const registerService = async (params: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post<AuthResponse>('/signup', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

// TODO:: Bunu bağla
export const passwordConfirmationService = async (params: {
  password: string;
  passwordConfirmation: string;
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  }).catch(error => {
    showAPIErrorToast(error);
    throw error;
  });
};

export const userMeService = async () => {
  try {
    const response = await api.get<UserResponse>('/user-me');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const updateUserProfileService = async (params: {email: string}) => {
  try {
    const response = await api.post('/user-update', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};
