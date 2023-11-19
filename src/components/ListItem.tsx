import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

interface Props {
  icon?: string;
  label: string;
  value?: string;
  onPress?: () => void;
}

const ListItem: React.FC<Props> = ({icon, label, value, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} disabled={!onPress} onPress={onPress}>
      <View
        style={styles.container}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={16}>
        <View flexDirection="row" alignItems="center" gap={8}>
          {icon && <Icon name={icon} size={22} color={colors.primaryColor} />}
          <Text>{label}</Text>
        </View>
        <View
          flex
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={4}>
          {value && <Text textAlign="right">{value}</Text>}
          {onPress && (
            <Icon
              name={'chevron-right'}
              size={24}
              color={colors.captionTextColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor2,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
