import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const getFaqService = async () => {
  try {
    const response = await api.get<FaqResponse[]>('/faq');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const getCategoriesService = async () => {
  try {
    const response = await api.get<Category[]>('/category');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const getCampaignsService = async () => {
  try {
    const response = await api.get<Campaign[]>('/campaigns');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const checkCouponCodeService = async (params: {
  couponCode: string;
  businessID: string;
}) => {
  try {
    const response = await api.get<Discount>(
      `/promotionOrderApp/${params.couponCode}/${params.businessID}`,
    );
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};
