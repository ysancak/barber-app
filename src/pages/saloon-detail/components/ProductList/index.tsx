import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProductItem from './ProductItem';

import {View, Text} from '@/components';
import {colors} from '@/utils';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      {
        _id: '65524dc4940e10c58ce122ce',
        productName: 'Maybelline Color sensational',
        description: '122 Brick Beat',
        price: '164.34 TL',
        category: 'Face',
        productImage:
          'https://barberscout-8c49e53c42dc.herokuapp.com/assets/images/business/productImage-1699892098219-642483261.webp',
      },
      {
        _id: '65524dc4940e10c3ce122ce',
        productName: "L'Oreal Paris Perfect Match",
        description: 'Getöntes Serum',
        price: '164.34 TL',
        category: 'Nails',
        productImage:
          'https://barberscout-8c49e53c42dc.herokuapp.com/assets/images/business/productImage-1699892056878-592017763.webp',
      },
    ]);
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      'all',
      ...new Set(products.map(product => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  const renderCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategoryItem,
            ]}>
            <Text
              style={
                selectedCategory === category && styles.selectedCategoryText
              }>
              {category === 'all' ? 'Tümü' : category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderProducts = () => {
    const filteredProducts = products.filter(
      product =>
        selectedCategory === 'all' || product.category === selectedCategory,
    );
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {filteredProducts.map(product => (
          <ProductItem key={product._id} {...product} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name={'storefront'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Products
        </Text>
      </View>
      {renderCategories()}
      {renderProducts()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor3,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
});

export default ProductList;
