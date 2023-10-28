import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BaseToast,
  SuccessToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
  BaseToastProps,
} from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@/utils';

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      style={[styles.success, styles.base]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
      renderTrailingIcon={() => (
        <View style={styles.iconView}>
          <Icon name="check-circle" size={36} color={colors.successColor} />
        </View>
      )}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.error, styles.base]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
      renderTrailingIcon={() => (
        <View style={styles.iconView}>
          <Icon name="error" size={36} color={colors.errorColor} />
        </View>
      )}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      style={[styles.info, styles.base]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
      renderTrailingIcon={() => (
        <View style={styles.iconView}>
          <Icon name="help" size={36} color={colors.infoColor} />
        </View>
      )}
    />
  ),
  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.warning, styles.base]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
      renderTrailingIcon={() => (
        <View style={styles.iconView}>
          <Icon name="warning" size={36} color={colors.warningColor} />
        </View>
      )}
    />
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  base: {
    borderLeftWidth: 6,
    paddingVertical: 16,
    height: 'auto',
  },
  iconView: {
    justifyContent: 'center',
    paddingRight: 16,
  },
  text1Style: {
    fontSize: 15,
    color: colors.textColor,
  },
  text2Style: {
    fontSize: 15,
    color: colors.textColor,
  },
  error: {
    borderLeftColor: colors.errorColor,
  },
  success: {
    borderLeftColor: colors.successColor,
  },
  warning: {
    borderLeftColor: colors.warningColor,
  },
  info: {
    borderLeftColor: colors.infoColor,
  },
});
