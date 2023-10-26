import Toast from 'react-native-toast-message';

export function showErrorToast(title: string, message: string) {
  Toast.show({
    type: 'error',
    position: 'bottom',
    text1: title,
    text2: message,
    visibilityTime: 4000,
  });
}

export function showSuccessToast(title: string, message: string) {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: title,
    text2: message,
    visibilityTime: 4000,
  });
}

export function showInfoToast(title: string, message: string) {
  Toast.show({
    type: 'info',
    position: 'bottom',
    text1: title,
    text2: message,
    visibilityTime: 4000,
  });
}
