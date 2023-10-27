import React from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from '@/components/Text';
import {colors} from '@/utils';
import View from '@/components/View';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'secondary' | 'text';
  loading?: boolean;
  suffixIcon?: string;
  prefixIcon?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'default',
  loading = false,
  suffixIcon,
  prefixIcon,
}) => {
  const backgroundColors = {
    default: colors.primaryColor,
    secondary: colors.borderColor,
    text: 'transparent',
  };

  const contentColors = {
    default: colors.whiteColor,
    secondary: colors.textColor,
    text: colors.primaryColor,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, {backgroundColor: backgroundColors[variant]}]}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={contentColors[variant]} />
      ) : (
        <View flexDirection="row" alignItems="center">
          <View style={styles.icon} alignItems="flex-start">
            {prefixIcon && (
              <Icon
                name={prefixIcon}
                size={22}
                color={contentColors[variant]}
              />
            )}
          </View>
          <Text
            medium
            textAlign="center"
            style={[styles.text, {color: contentColors[variant]}]}>
            {label}
          </Text>
          <View style={styles.icon} alignItems="flex-end">
            {suffixIcon && (
              <Icon
                name={suffixIcon}
                size={22}
                color={contentColors[variant]}
              />
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
    width: 40,
  },
});

export default Button;
