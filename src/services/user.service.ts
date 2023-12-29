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

export const passwordConfirmationService = async (params: {
  password: string;
  passwordConfirmation: string;
}) => {
  try {
    const response = await api.post('/password-confirmation', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const userMeService = async () => {
  try {
    const response = await api.get<User>('/user-me');
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

export const deleteAccountService = async () => {
  try {
    const response = await api.post('/user-delete');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};
