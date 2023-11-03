import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Button, Input, Text, View} from '@/components';
import {getCategoriesService} from '@/services/common.service';
import {colors} from '@/utils';

const SearchSaloons = () => {
  const [categories, setCategories] = useState<Category[]>();

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

      <View>
        <Input.Select
          placeholder="Kategorie auswahlen"
          options={categories}
          optionLabel="categoryName"
          optionValue="_id"
          value=""
          onChange={item => console.log(item)}
        />
        <Button prefixIcon="search" label="Ara" />
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
