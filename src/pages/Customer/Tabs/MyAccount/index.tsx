import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, ScrollView, StyleSheet} from 'react-native';

import Account from './components/Account';

import {ListItem, View} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';
import {AGB_URL, IMPRESSUM_URL} from '@/utils/constants';

function MyAccount(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<CustomerRootStackParamList>();

  return (
    <ScrollView style={styles.container}>
      <View fullHeight gap={8}>
        <Account />
        <View>
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
          <ListItem
            label={t('myAccount.options.agb')}
            onPress={() => Linking.openURL(AGB_URL)}
          />
          <ListItem
            label={t('myAccount.options.impressum')}
            onPress={() => Linking.openURL(IMPRESSUM_URL)}
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
