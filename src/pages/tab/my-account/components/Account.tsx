import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {Button, ListItem, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {clearTokens} from '@/store/auth';

function Account(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accessToken} = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return (
      <>
        <View>
          <ListItem
            icon="edit"
            label={t('myAccount.options.editProfile')}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <ListItem
            icon="logout"
            label={t('myAccount.options.logout')}
            onPress={() => dispatch(clearTokens())}
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
