import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Button, Input, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {getCategoriesService} from '@/services/common.service';
import {colors} from '@/utils';

const SearchSaloons = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const result = await getCategoriesService();
      setCategories(result);
    } finally {
    }
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
        <Input.Gender />
        <Input.Select
          placeholder="Kategorie auswahlen"
          options={categories}
          optionLabel="categoryName"
          optionValue="_id"
          onChange={item => console.log(item)}
        />
        <Input.Address placeholder="Ort wahlen" />
        <Button
          prefixIcon="search"
          label="Ara"
          onPress={() => navigation.navigate('MapListing')}
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
