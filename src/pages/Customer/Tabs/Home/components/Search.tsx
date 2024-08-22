import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Button, Input, Text, View} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {searchValidationSchema} from '@/schemas/validations';
import {getCategoriesService} from '@/services/common.service';
import {getMapSaloonsService} from '@/services/saloon.service';
import {setSaloons} from '@/store/search';
import {colors} from '@/utils';
import {checkAndRequestLocationPermission} from '@/utils/helpers';

const SearchSaloons = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categoriesFetch = useFetch(getCategoriesService);

  const formik = useFormik({
    initialValues: {
      gender: 'Male',
      category: '',
    },
    validationSchema: searchValidationSchema,
    onSubmit: async values => {
      try {
        await checkAndRequestLocationPermission();
        const result = await getMapSaloonsService(values);
        if (result) {
          dispatch(setSaloons(result));
          navigation.navigate('MapListing');
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    categoriesFetch.fetch();
  }, []);

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
              <Text key={index} variant="title" style={styles.highlightedPart}>
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
      <View style={styles.heroTextContainer}>
        <Text color={colors.whiteColor}>{t('search.topTitle')}</Text>
      </View>

      {generateTitle()}

      <View gap={10}>
        <Input.Gender
          selected={formik.values.gender}
          onChange={formik.handleChange('gender')}
        />
        <Input.Select
          placeholder={t('search.categoryPlaceholder')}
          options={categoriesFetch.data || []}
          optionLabel="categoryName"
          optionValue="_id"
          onChange={item => formik.setFieldValue('category', item ? item : '')}
          value={formik.values.category}
          loading={categoriesFetch.loading}
        />
        <Button
          prefixIcon="search"
          label={t('search.buttonLabel')}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
};

export default SearchSaloons;

const styles = StyleSheet.create({
  heroTextContainer: {
    backgroundColor: colors.secondaryColor,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
  highlightedPart: {
    color: colors.primaryColor,
  },
});
