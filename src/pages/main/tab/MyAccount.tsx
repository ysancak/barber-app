import React, {useTransition} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {ListItem, Text, View} from '@/components';
import {colors} from '@/utils';
import {useDispatch} from 'react-redux';
import {clearTokens} from '@/store/auth';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@/hooks/useNavigation';

function MyAccount(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View fullHeight gap={8}>
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
            icon="location-pin"
            label={t('myAccount.options.myAddresses')}
            onPress={console.log}
          />
          <ListItem
            icon="settings"
            label={t('myAccount.options.settings')}
            onPress={console.log}
          />
        </View>
        <View>
          <ListItem
            label={t('myAccount.options.aboutOfApp')}
            onPress={console.log}
          />
          <ListItem label={t('myAccount.options.faq')} onPress={console.log} />
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
  accountContainer: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },
});
