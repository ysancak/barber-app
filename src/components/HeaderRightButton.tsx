import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native';

import Text from './Text';

import {colors} from '@/utils';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const HeaderRightButton: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.primaryColor} />
      ) : (
        <Text
          medium
          fontSize={17}
          color={colors.primaryColor}
          style={[disabled && styles.disabled]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default HeaderRightButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 12,
  },
  disabled: {
    color: colors.captionTextColor,
  },
});
