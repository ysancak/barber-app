import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, FlatList} from 'react-native';

import Button from '@/components/Button';
import RadioListItem from '@/components/RadioListItem';

const SelectInputDetail = () => {
  const {t} = useTranslation();
  const {params} = useRoute();
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(params.selectedValue);

  const handleSelectOption = option => {
    setSelectedValue(option);
  };

  const saveAndGoBack = () => {
    params?.onOptionChange(selectedValue);
    navigation.goBack();
  };

  navigation.setOptions({
    title: params.title || t('selectInput.default'),
    headerRight() {
      return (
        <Button
          variant="text"
          disabled={!selectedValue}
          label={t('general.save')}
          onPress={saveAndGoBack}
        />
      );
    },
  });

  return (
    <FlatList
      data={params.options}
      keyExtractor={item => item[params.optionValue]}
      renderItem={({item}) => (
        <RadioListItem
          label={item[params.optionLabel]}
          active={
            selectedValue &&
            selectedValue[params.optionValue] === item[params.optionValue]
          }
          onPress={() => handleSelectOption(item)}
        />
      )}
    />
  );
};

export default SelectInputDetail;

const styles = StyleSheet.create({});
