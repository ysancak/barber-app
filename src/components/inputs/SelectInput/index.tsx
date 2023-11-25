import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

type Props = {
  placeholder: string;
  optionLabel: string;
  optionValue: string;
  options: SelectOption[];
  value?: SelectValue;
  loading?: boolean;
  onChange: (item: SelectOption | undefined) => void;
};

const SelectInput: React.FC<Props> = ({
  placeholder,
  optionLabel,
  optionValue,
  options,
  value,
  loading,
  onChange,
}) => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(
    undefined,
  );

  useEffect(() => {
    if (value) {
      findInitialValue();
    }
  }, [options]);

  const findInitialValue = () => {
    try {
      const findedValue = options.find(item => item[optionValue] === value);
      setSelectedValue(findedValue);
    } catch (error) {
      console.error('Failed to set initial value');
    }
  };

  const onOptionChange = (option: SelectOption) => {
    setSelectedValue(option);
    onChange(option[optionValue]);
  };

  const renderValueView = useMemo(() => {
    if (!selectedValue) {
      return <Text color={colors.captionTextColor}>{placeholder}</Text>;
    }
    return <Text>{selectedValue[optionLabel]}</Text>;
  }, [selectedValue]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      disabled={loading}
      onPress={() =>
        navigation.navigate('SelectInputDetail', {
          title: placeholder,
          options,
          selectedValue,
          onOptionChange,
          optionLabel,
          optionValue,
        })
      }>
      <View flex>{renderValueView}</View>
      <View>
        {loading ? (
          <View paddingHorizontal={4} paddingVertical={5}>
            <ActivityIndicator />
          </View>
        ) : (
          <Icon name={'expand-more'} size={30} color={colors.textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
