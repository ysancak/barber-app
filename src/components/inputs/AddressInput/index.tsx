import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Space, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

type Props = {
  placeholder: string;
  onChange: (coordinate: Coordinate | null) => void;
  error?: string | undefined | false;
};

const AddressInput: React.FC<Props> = ({placeholder, onChange, error}) => {
  const navigation = useNavigation();
  const [label, setLabel] = useState<string>('');

  const _onChange = (_label: string, _coordinate: Coordinate) => {
    setLabel(_label);
    onChange(_coordinate);
  };

  const resetValues = () => {
    setLabel('');
    onChange(null);
  };

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
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.container, error && styles.error]}
        onPress={() =>
          navigation.navigate('AddressInputDetail', {
            title: placeholder,
            onChange: _onChange,
          })
        }>
        <View>
          <Icon
            name={'location-on'}
            size={30}
            color={colors.captionTextColor}
          />
        </View>
        <View style={styles.flexView}>
          <Text
            numberOfLines={1}
            color={label ? colors.textColor : colors.captionTextColor}>
            {label || placeholder}
          </Text>
        </View>
        {label && (
          <TouchableOpacity style={styles.resetButton} onPress={resetValues}>
            <Icon name={'close'} size={22} color={colors.textColor} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Space size={6} />
      {error && renderErrorView}
    </View>
  );
};

export default AddressInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flexView: {
    flex: 1,
  },
  resetButton: {
    padding: 2,
    backgroundColor: colors.borderColor2,
    borderRadius: 99,
  },
  error: {
    borderColor: colors.errorColor,
  },
});
