import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Menu from './components/Menu';

import {SafeAreaView, Text} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

export default function Dashboard() {
  const navigation = useNavigation<AdminStackParamList>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="title" fontSize={26}>
          Hoşgeldin Yusuf,
        </Text>
        <Menu />
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
            height: 160,
            marginBottom: 8,
          }}
        />
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.gridItemContainer}
          onPress={() => navigation.navigate('Calendar')}>
          <Icon name="calendar-month" size={36} color={colors.primaryColor} />
          <Text variant="subtitle" fontSize={16}>
            Takvim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.gridItemContainer}
          onPress={() => navigation.navigate('WorkerManagement')}>
          <Icon name="person" size={36} color={colors.primaryColor} />
          <Text variant="subtitle" fontSize={16}>
            Çalışan yönetimi
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
          }}
        />
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
          }}
        />
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.gridItemContainer,
            backgroundColor: colors.borderColor2,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.bgColor,
  },
  header: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
    zIndex: -1,
  },
  gridItemContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.whiteColor,
    borderRadius: 14,
    padding: 16,
    height: 110,
    gap: 8,
    justifyContent: 'space-evenly',
  },
});
