import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import Account from './components/Account';

import {ListItem, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

function MyAccount(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View fullHeight gap={8}>
        <Account />
        <View>
          <ListItem
            icon="content-cut"
            label={t('myAccount.options.reservations')}
            onPress={console.log}
          />
          <ListItem
            icon="shopping-bag"
            label={t('myAccount.options.myOrders')}
            onPress={console.log}
          />
          <ListItem
            icon="credit-card"
            label={t('myAccount.options.paymentMethods')}
            onPress={console.log}
          />
          <ListItem
            icon="settings"
            label={t('myAccount.options.settings')}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <View>
          <ListItem
            label={t('myAccount.options.faq')}
            onPress={() => navigation.navigate('Faq')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});
