import React, {useMemo, useState} from 'react';
import BaseInput from './BaseInput';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/utils';

interface PasswordInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: KeyboardType;
  icon?: string;
  error?: string | undefined | false;
}

const PasswordInput: React.FC<PasswordInputProps> = props => {
  const [showPassword, setShowPassword] = useState(false);

  const renderPrefix = (
    <Icon name={props.icon ?? 'edit'} size={22} color={colors.primaryColor} />
  );

  const renderSuffix = useMemo(() => {
    return (
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Icon
          name={showPassword ? 'visibility-off' : 'visibility'}
          size={20}
          color={colors.textColor}
        />
      </TouchableOpacity>
    );
  }, [showPassword]);

  return (
    <BaseInput
      {...props}
      secureTextEntry={!showPassword}
      prefix={renderPrefix}
      suffix={renderSuffix}
    />
  );
};

export default PasswordInput;
