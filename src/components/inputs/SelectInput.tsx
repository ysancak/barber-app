import React from 'react';
import {StyleSheet} from 'react-native';
import Dropdown from 'react-native-input-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from '../Text';
import View from '../View';

import {colors} from '@/utils';
import {hp} from '@/utils/responsive';

type Props = {
  placeholder: string;
  optionLabel: string;
  optionValue: string;
  options: any;
  value: any;
  onChange: (item: any) => void;
};

const SelectInput: React.FC<Props> = ({
  placeholder,
  optionLabel,
  optionValue,
  options,
  value,
  onChange,
}) => {
  return (
    <Dropdown
      placeholder={placeholder}
      dropdownStyle={styles.container}
      isMultiple={false}
      optionLabel={optionLabel}
      optionValue={optionValue}
      options={options}
      placeholderStyle={styles.placeholderStyle}
      selectedItemStyle={styles.selectedItemStyle}
      labelStyle={styles.labelStyle}
      dropdownIconStyle={styles.dropdownIconStyle}
      dropdownIcon={
        <Icon name={'expand-more'} size={30} color={colors.textColor} />
      }
      checkboxComponentStyles={styles.checkboxComponentStyles}
      listHeaderComponent={
        <View style={styles.listHeaderComponent}>
          <Text variant="title" fontSize={18}>
            {placeholder}
          </Text>
        </View>
      }
      modalOptionsContainerStyle={styles.modalOptionsContainerStyle}
      listComponentStyles={styles.listComponentStyles}
      selectedValue={value}
      onValueChange={value => onChange(value)}
    />
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    backgroundColor: colors.whiteColor,
  },
  placeholderStyle: {
    fontFamily: 'EncodeSans-Medium',
    color: colors.captionTextColor,
    fontSize: 15,
  },
  selectedItemStyle: {
    fontFamily: 'EncodeSans-Medium',
    fontSize: 15,
  },
  labelStyle: {
    fontFamily: 'EncodeSans-Medium',
    color: colors.captionTextColor,
    fontSize: 15,
  },
  dropdownIconStyle: {
    top: 16,
    right: 16,
  },
  checkboxComponentStyles: {
    checkboxLabelStyle: {
      fontFamily: 'EncodeSans-Medium',
      fontSize: 15,
    },
    checkboxSize: 20,
    checkboxStyle: {
      borderColor: colors.borderColor,
      backgroundColor: colors.primaryColor,
    },
  },
  listHeaderComponent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalOptionsContainerStyle: {
    height: hp(60),
    backgroundColor: colors.bgColor,
  },
  listComponentStyles: {
    listEmptyComponentStyle: {
      fontFamily: 'EncodeSans-Medium',
    },
    itemSeparatorStyle: {
      borderWidth: 0.4,
      backgroundColor: colors.borderColor2,
    },
    sectionHeaderStyle: {
      padding: 10,
      backgroundColor: 'cyan',
    },
  },
  // Add any other style definitions as needed
});
