import React from 'react';
import {StyleSheet} from 'react-native';

import {Button, Text, View} from '@/components';
import {colors} from '@/utils';

const SaloonDetailServiceItem = () => {
  return (
    <View style={styles.container}>
      <Text fontSize={17}>Beard Trim with Hot Towel - Haircut</Text>
      <Text variant="title" fontSize={20}>
        CHF 70
      </Text>
      <Button label="Auswahlen" />
    </View>
  );
};

export default SaloonDetailServiceItem;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    backgroundColor: colors.whiteColor,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.borderColor,
  },
});
