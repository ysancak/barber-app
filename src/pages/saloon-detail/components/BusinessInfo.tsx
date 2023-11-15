import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

const BusinessInfo = () => {
  return (
    <View>
      <View style={styles.container}>
        <Icon name={'business-center'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Business Info
        </Text>
      </View>
      <View style={{gap: 16}} />
    </View>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
});
