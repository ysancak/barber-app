import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {View, Text} from '@/components';
import {colors} from '@/utils';

type Props = {
  onChange?: (value: string) => void;
};

const GenderInput: React.FC<Props> = ({onChange}) => {
  const [active, setActive] = useState('man');

  const onPressHandler = (value: string) => {
    setActive(value);
    if (onChange) {
      onChange(value);
    }
  };

  const getIconColor = gender =>
    active === gender ? colors.whiteColor : colors.secondaryColor;
  const getTextColor = gender =>
    active === gender ? colors.whiteColor : colors.textColor;

  return (
    <View style={styles.container}>
      {['man', 'woman'].map(gender => (
        <TouchableOpacity
          key={gender}
          activeOpacity={0.8}
          style={[styles.option, active === gender && styles.active]}
          onPress={() => onPressHandler(gender)}>
          <Icon name={gender} size={30} color={getIconColor(gender)} />
          <Text medium color={getTextColor(gender)}>
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GenderInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  active: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 8,
  },
});
