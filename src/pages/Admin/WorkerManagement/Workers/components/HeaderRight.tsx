import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {View} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

export default function HeaderRight() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AdminAddWorker')}>
      <View style={styles.headerRight}>
        <Icon name="add" size={26} color={colors.primaryColor} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingHorizontal: 16,
  },
});
