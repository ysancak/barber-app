import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, SafeAreaView} from 'react-native';

import CurrentList from './CurrentList';
import HistoricalList from './HistoricalList';

import {TabView} from '@/components';
import {colors} from '@/utils';

export default function MyOrders() {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <TabView.Container activeIndex={0}>
        <TabView.Content title={t('myOrders.tabs.current')}>
          <CurrentList />
        </TabView.Content>
        <TabView.Content title={t('myOrders.tabs.past')}>
          <HistoricalList />
        </TabView.Content>
      </TabView.Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  headerRight: {
    paddingHorizontal: 16,
  },
});
