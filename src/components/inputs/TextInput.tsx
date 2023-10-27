import React from 'react';
import BaseInput from './BaseInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/utils';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: KeyboardType;
  icon?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = props => {
  const renderPrefix = (
    <Icon name={props.icon ?? 'edit'} size={22} color={colors.primaryColor} />
  );

  return <BaseInput prefix={renderPrefix} {...props} />;
};

export default TextInput;
