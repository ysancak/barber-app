import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Button, Input, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {searchValidationSchema} from '@/schemas/validations';
import {getCategoriesService} from '@/services/common.service';
import {colors} from '@/utils';

const SearchSaloons = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      gender: 'Man',
      category: '',
      address: null,
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

  return (
    <View gap={20}>
      <View style={styles.highlightedText}>
        <Text color={colors.whiteColor}>
          Entdecken Sie erstklassige Limousinen
        </Text>
      </View>

      <Text variant="title">
        Wir stehen{' '}
        <Text variant="title" color={colors.primaryColor}>
          dahinter
        </Text>{' '}
        Jeder Termin
      </Text>

      <View gap={12}>
        <Input.Gender
          selected={formik.values.gender}
          onChange={formik.handleChange('gender')}
        />
        {categories.length > 0 && (
          <Input.Select
            placeholder="Kategorie auswahlen"
            options={categories}
            optionLabel="categoryName"
            optionValue="_id"
            onChange={item =>
              formik.setFieldValue('category', item ? item : '')
            }
            value={formik.values.category}
          />
        )}
        <Input.Address
          placeholder="Ort wahlen"
          onChange={coordinate => formik.setFieldValue('address', coordinate)}
          error={formik.touched.address && formik.errors.address}
        />
        <Button prefixIcon="search" label="Ara" onPress={formik.handleSubmit} />
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
