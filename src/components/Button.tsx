import React from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from '@/components/Text';
import View from '@/components/View';
import {colors} from '@/utils';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'secondary' | 'text';
  disabled?: boolean;
  loading?: boolean;
  suffixIcon?: string;
  prefixIcon?: string;
}

const Button: React.FC<Props> = ({
  label,
  onPress,
  variant = 'default',
  disabled = false,
  loading = false,
  suffixIcon,
  prefixIcon,
}) => {
  const {background, color} = stylesVariants[variant];
  const isTextVariant = variant === 'text';

  const renderIcon = (iconName: string) => (
    <View style={[styles.iconWrapper, isTextVariant && styles.iconWrapperText]}>
      <Icon name={iconName} size={22} color={color} />
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.buttonBase,
        {backgroundColor: background},
        isTextVariant && styles.buttonText,
      ]}
      disabled={loading || disabled}>
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <View flexDirection="row" alignItems="center">
          {prefixIcon && renderIcon(prefixIcon)}
          <Text
            medium
            textAlign="center"
            color={
              isTextVariant
                ? disabled
                  ? colors.captionTextColor
                  : color
                : color
            }
            style={isTextVariant ? undefined : styles.flexible}>
            {label}
          </Text>
          {suffixIcon && renderIcon(suffixIcon)}
        </View>
      )}
    </TouchableOpacity>
  );
};

const stylesVariants = {
  default: {
    background: colors.primaryColor,
    color: colors.whiteColor,
  },
  secondary: {
    background: colors.borderColor,
    color: colors.textColor,
  },
  text: {
    background: 'transparent',
    color: colors.primaryColor,
  },
};

const styles = StyleSheet.create({
  buttonBase: {
    padding: 12,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    flex: 1,
    paddingHorizontal: 12,
  },
  flexible: {
    flex: 1,
  },
  iconWrapper: {
    width: 30,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  iconWrapperText: {
    width: 0,
    paddingHorizontal: 0,
  },
});

export default Button;
