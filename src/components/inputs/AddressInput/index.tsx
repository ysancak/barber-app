import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

type Props = {
  placeholder: string;
};

const AddressInput: React.FC<Props> = ({placeholder}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View>
        <Icon name={'location-on'} size={30} color={colors.captionTextColor} />
      </View>
      <View flex>
        <Text color={colors.captionTextColor}>{placeholder}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddressInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
