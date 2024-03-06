import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CurrentList from './CurrentList';
import HistoricalList from './HistoricalList';

import {TabView} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

export default function DayOffs() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const HeaderRightComponent = () => (
    <TouchableOpacity onPress={() => navigation.navigate('AdminAddDayOff')}>
      <View style={styles.headerRight}>
        <Icon name="add" size={26} color={colors.primaryColor} />
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightComponent,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TabView.Container activeIndex={0}>
        <TabView.Content title={t('adminDayOffs.tabs.current')}>
          <CurrentList />
        </TabView.Content>
        <TabView.Content title={t('adminDayOffs.tabs.past')}>
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
