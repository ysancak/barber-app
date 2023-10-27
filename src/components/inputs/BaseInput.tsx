import React, {useMemo} from 'react';
import {TextInput as RNTextInput, StyleSheet, ViewProps} from 'react-native';
import View from '@/components/View';
import Text from '@/components/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/utils';
import Space from '../Space';

interface BaseInputProps extends ViewProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: KeyboardType;
  error?: string;
}

const BaseInput: React.FC<BaseInputProps> = ({
  prefix,
  suffix,
  placeholder,
  secureTextEntry,
  value,
  onChange,
  keyboardType,
  error,
  ...props
}) => {
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
        style={[styles.container, error && styles.error]}>
        {prefix && <View marginRight={10}>{prefix}</View>}
        <RNTextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
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
  },
  error: {
    borderColor: colors.errorColor,
  },
  input: {
    flex: 1,
    fontFamily: 'EncodeSans-Regular',
    fontSize: 15,
    height: 28,
  },
});

export default BaseInput;
