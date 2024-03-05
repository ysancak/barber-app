import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {Button, ListItem, Text, View} from '@/components';
import {showAlert} from '@/components/Alert';
import {useAuth, useNavigation} from '@/hooks';
import {deleteAccountService} from '@/services/user.service';
import {clearTokens} from '@/store/auth';
import {clearAllCarts} from '@/store/cart';
import {showSuccessToast} from '@/utils/toast';

function Account(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAuthenticated = useAuth('User');

  const deleteAccountHandler = () => {
    showAlert({
      title: t('myAccount.options.deleteAccount.alert.title'),
      content: t('myAccount.options.deleteAccount.alert.content'),
      buttons: [
        {
          text: t('myAccount.options.deleteAccount.alert.action'),
          type: 'default',
          onPress: async () => {
            try {
              const response = await deleteAccountService();
              if (response) {
                logoutHandler();
                showSuccessToast(
                  t('myAccount.options.deleteAccount.toastSuccess'),
                );
              }
            } catch {}
          },
        },
        {text: t('general.cancel'), type: 'secondary'},
      ],
    });
  };

  const logoutHandler = () => {
    dispatch(clearTokens());
    dispatch(clearAllCarts());
  };

  if (isAuthenticated) {
    return (
      <>
        <View>
          <ListItem
            icon="edit"
            label={t('myAccount.options.editProfile')}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <ListItem
            label={t('myAccount.options.deleteAccount.label')}
            onPress={deleteAccountHandler}
          />
          <ListItem
            icon="logout"
            label={t('myAccount.options.logout')}
            onPress={logoutHandler}
          />
        </View>
      </>
    );
  } else {
    return (
      <View paddingVertical={26} gap={20} paddingHorizontal={35}>
        <View gap={8}>
          <Text variant="title" fontSize={22} textAlign="center">
            {t('myAccount.account.title')}
          </Text>
          <Text textAlign="center">{t('myAccount.account.description')}</Text>
        </View>
        <Button
          label={t('loginAndRegister.login')}
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }
}

export default Account;
