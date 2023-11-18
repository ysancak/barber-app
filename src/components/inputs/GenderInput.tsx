import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {View, Text} from '@/components';
import {colors} from '@/utils';

enum Gender {
  Man = 'Man',
  Woman = 'Woman',
}

type Props = {
  selected: string;
  onChange: (value: Gender) => void;
};

const GenderInput: React.FC<Props> = ({selected = Gender.Man, onChange}) => {
  const {t} = useTranslation();
  const getIconColor = (gender: Gender) =>
    selected === gender ? colors.whiteColor : colors.secondaryColor;
  const getTextColor = (gender: Gender) =>
    selected === gender ? colors.whiteColor : colors.textColor;

  return (
    <View style={styles.container}>
      {Object.values(Gender).map(gender => (
        <TouchableOpacity
          key={gender}
          activeOpacity={0.8}
          style={[styles.option, selected === gender && styles.active]}
          onPress={() => onChange(gender)}>
          <Icon
            name={gender === Gender.Man ? 'man' : 'woman'}
            size={30}
            color={getIconColor(gender)}
          />
          <Text medium color={getTextColor(gender)}>
            {t(`gender.${gender}`)}
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
