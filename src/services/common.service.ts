import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const getFaqService = async () => {
  try {
    const response = await api.get<FaqResponse[]>('/faq');
    return [
      {
        _id: '6524e2108b4a751a4d3f373e',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat bibendum ligula ac facilisis. ',
        question: 'How do I redeem a coupon?',
      },
      {
        __v: 0,
        _id: '6534c7a7e5fb6cf582c15690',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat bibendum ligula ac facilisis. ',
        question: 'Can I get a refund?',
      },
      {
        __v: 0,
        _id: '6534c7e9e5fb6cf582c15693',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat bibendum ligula ac facilisis. ',
        question: 'How can I reach businesses?',
      },
    ];
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
  }
};
