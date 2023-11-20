import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import {Button, Input, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {searchValidationSchema} from '@/schemas/validations';
import {getCategoriesService} from '@/services/common.service';
import {colors} from '@/utils';

const SearchSaloons = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      gender: 'Man',
      category: '',
    },
    validationSchema: searchValidationSchema,
    onSubmit: values => {
      console.log(values);
      navigation.navigate('MapListing');
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await getCategoriesService();
    setCategories(result ?? []);
  };

  const generateTitle = () => {
    const fullText = t('search.highlightedTitle');
    const textParts = fullText.split('*');

    return (
      <View>
        <Text variant="title">
          {textParts.map((part, index) =>
            index % 2 === 0 ? (
              part
            ) : (
              <Text
                key={index}
                variant="title"
                style={{color: colors.primaryColor}}>
                {part}
              </Text>
            ),
          )}
        </Text>
      </View>
    );
  };

  return (
    <View gap={20}>
      <View style={styles.highlightedText}>
        <Text color={colors.whiteColor}>{t('search.topTitle')}</Text>
      </View>

      {generateTitle()}

      <View gap={10}>
        <Input.Gender
          selected={formik.values.gender}
          onChange={formik.handleChange('gender')}
        />
        {categories.length > 0 && (
          <Input.Select
            placeholder={t('search.categoryPlaceholder')}
            options={categories}
            optionLabel="categoryName"
            optionValue="_id"
            onChange={item =>
              formik.setFieldValue('category', item ? item : '')
            }
            value={formik.values.category}
          />
        )}
        <Button
          prefixIcon="search"
          label={t('search.buttonLabel')}
          onPress={formik.handleSubmit}
        />
      </View>
    </View>
  );
};

export default SearchSaloons;

const styles = StyleSheet.create({
  highlightedText: {
    backgroundColor: colors.secondaryColor,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
});
