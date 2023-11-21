import {showAlert} from '@/components/Alert';
import {navigate} from '@/router/root.navigation';

export const authWarningAlert = () =>
  showAlert({
    title: 'Giriş yapın',
    content: 'Bu özelliği kullanmak için giriş yapmalısınız',
    buttons: [
      {
        text: 'Giriş yap',
        type: 'default',
        onPress: () => navigate('Login'),
      },
      {
        text: 'İptal',
        type: 'cancel',
      },
    ],
    isBackdropPress: true,
  });
