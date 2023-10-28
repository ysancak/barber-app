import i18n from 'i18next';
import Toast, {ToastShowParams} from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastParams = {
  type: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  topOffset?: number;
};

const showToast = ({
  type,
  title,
  description,
  duration = 3000,
  topOffset = 64,
}: ToastParams): void => {
  const toastConfig: ToastShowParams = {
    type,
    text1: title,
    text2: description,
    visibilityTime: duration,
    autoHide: true,
    topOffset: topOffset,
    bottomOffset: 40,
  };

  Toast.show(toastConfig);
};

export const showAPIErrorToast = (error?: any) => {
  showToast({
    type: 'error',
    description:
      error?.response?.data?.error || i18n.t('toast.apiErrorDefaultMessage'),
  });
};
export const showErrorToast = (title?: string, message?: string) => {
  showToast({
    type: 'error',
    title: title || i18n.t('toast.error.title'),
    description: message || i18n.t('toast.error.message'),
  });
};

export const showSuccessToast = (title?: string, message?: string) => {
  showToast({
    type: 'success',
    title: title || i18n.t('toast.success.title'),
    description: message || i18n.t('toast.success.message'),
  });
};

export const showWarningToast = (title?: string, message?: string) => {
  showToast({
    type: 'warning',
    title: title || i18n.t('toast.warning.title'),
    description: message || undefined,
  });
};

export const showInfoToast = (title?: string, message?: string) => {
  showToast({
    type: 'info',
    title: title || i18n.t('toast.info.title'),
    description: message || undefined,
  });
};

export default showToast;
