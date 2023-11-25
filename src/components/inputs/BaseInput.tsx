import React, {useState} from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import View from '../View';

import Text from '@/components/Text';
import {colors} from '@/utils';

interface BaseInputProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  editable: boolean;
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
  editable,
  keyboardType,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

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
          editable={editable}
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
      {error && (
        <View flexDirection="row" alignItems="center" gap={2} paddingTop={6}>
          <Icon name="error" size={22} color={colors.errorColor} />
          <Text color={colors.errorColor} fontSize={14}>
            {error}
          </Text>
        </View>
      )}
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
    paddingVertical: 5,
  },
});

export default BaseInput;
