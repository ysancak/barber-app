import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

interface Props {
  label: string;
  active: boolean;
  onPress?: () => void;
}

const RadioListItem: React.FC<Props> = ({label, active, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} disabled={!onPress} onPress={onPress}>
      <View
        style={styles.container}
        flexDirection="row"
        alignItems="center"
        gap={8}>
        <Icon
          name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={24}
          color={active ? colors.primaryColor : colors.captionTextColor}
        />
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor2,
    height: 56,
    paddingHorizontal: 12,
  },
});
