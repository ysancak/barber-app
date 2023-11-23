import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseInput from './BaseInput';

import {colors} from '@/utils';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: KeyboardType;
  editable: boolean;
  icon?: string;
  error?: string | undefined | false;
}

const TextInput: React.FC<TextInputProps> = props => {
  const renderPrefix = () => {
    if (!props.icon) {
      return <></>;
    }
    return (
      <Icon name={props.icon ?? 'edit'} size={22} color={colors.primaryColor} />
    );
  };

  return (
    <BaseInput prefix={renderPrefix()} editable={props.editable} {...props} />
  );
};

export default TextInput;
