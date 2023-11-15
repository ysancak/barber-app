import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Text} from '@/components';
import {colors} from '@/utils';

type Props = {
  onChange: (category: string) => void;
};

const CategoryList: React.FC<Props> = ({onChange}) => {
  const categoryList = ['Category 1', 'Category 2', 'Category 3'];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.scrollView}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={() => onChange('all')}>
        <Text>Tümü</Text>
      </TouchableOpacity>
      {categoryList.map(item => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.container}
          onPress={() => onChange(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  container: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
});
