import {t} from 'i18next';

import {showAlert} from '@/components/Alert';
import {navigate} from '@/router/root.navigation';

export const authWarningAlert = () =>
  showAlert({
    title: t('alert.auth.title'),
    content: t('alert.auth.description'),
    buttons: [
      {
        text: t('alert.auth.actions.login'),
        type: 'default',
        onPress: () => navigate<CustomerRootStackParamList>('Login'),
      },
      {
        text: t('alert.auth.actions.cancel'),
        type: 'secondary',
      },
    ],
    isBackdropPress: true,
  });
