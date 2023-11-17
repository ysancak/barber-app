import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';
import {wp} from '@/utils/responsive';

const ProductItem: React.FC<Product> = ({
  _id,
  category,
  description,
  price,
  productImage,
  productName,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: productImage}}
        style={{width: '100%', height: 150}}
        resizeMode="contain"
      />
      <View gap={16}>
        <View flex gap={8}>
          <Text fontSize={17} semibold>
            {productName}
          </Text>
          <Text>{description}</Text>
        </View>
        <View flexDirection="row" alignItems="center" gap={22}>
          <View flex gap={4}>
            <Text variant="title" fontSize={20} color={colors.primaryColor}>
              {price}
            </Text>
            <Text
              variant="title"
              fontSize={16}
              style={styles.oldPrice}
              color={colors.captionTextColor}>
              {price}
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="shopping-cart" size={22} color={colors.whiteColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    backgroundColor: colors.whiteColor,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.borderColor3,
    width: 240,
  },
  addButton: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderRadius: 8,
  },
  oldPrice: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
});
