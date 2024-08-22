import React from 'react';
import {Switch as BaseSwitch} from 'react-native';

import {colors} from '@/utils';

type Props = {
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export default function Switch({value, disabled, onChange}: Props) {
  return (
    <BaseSwitch
      trackColor={{false: colors.borderColor, true: colors.primaryColor}}
      thumbColor={'white'}
      onValueChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}
