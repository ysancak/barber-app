import React, {useMemo, useState} from 'react';
import {TextInput as RNTextInput, StyleSheet, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Space from '../Space';

import Text from '@/components/Text';
import View from '@/components/View';
import {colors} from '@/utils';

interface BaseInputProps extends ViewProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: KeyboardType;
  error?: string | undefined | false;
}

const BaseInput: React.FC<BaseInputProps> = ({
  prefix,
  suffix,
  placeholder,
  secureTextEntry,
  value,
  onChange,
  onBlur,
  keyboardType,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const renderErrorView = useMemo(() => {
    return (
      <View flexDirection="row" alignItems="center" gap={2}>
        <Icon name="error" size={22} color={colors.errorColor} />
        <Text color={colors.errorColor} fontSize={14}>
          {error}
        </Text>
      </View>
    );
  }, [error]);

  return (
    <View>
      <View
        flexDirection="row"
        alignItems="center"
        padding={10}
        style={[
          styles.container,
          error && styles.error,
          isFocused && styles.focused,
        ]}>
        {prefix && <View marginRight={10}>{prefix}</View>}
        <RNTextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          autoCapitalize="none"
          onChangeText={onChange}
          keyboardType={keyboardType}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) {
              onBlur();
            }
          }}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        {suffix && <View marginLeft={10}>{suffix}</View>}
      </View>
      <Space size={6} />
      {error && renderErrorView}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    backgroundColor: colors.whiteColor,
  },
  error: {
    borderColor: colors.errorColor,
  },
  focused: {
    borderColor: colors.primaryColor,
  },
  input: {
    flex: 1,
    fontFamily: 'EncodeSans-Regular',
    fontSize: 15,
    height: 28,
  },
});

export default BaseInput;
