import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

const ProductItem: React.FC<Product> = ({
  _id,
  category,
  description,
  price,
  productImage,
  productName,
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: productImage}}
        style={styles.image}
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
          {isAddedToCart ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.decreaseButton}
                onPress={handleAddToCart}>
                <Icon name="remove" size={22} color={colors.whiteColor} />
              </TouchableOpacity>

              <Text medium fontSize={18} color={colors.whiteColor}>
                1
              </Text>

              <TouchableOpacity style={styles.increaseButton}>
                <Icon name="add" size={22} color={colors.whiteColor} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}>
              <Icon name="shopping-cart" size={22} color={colors.whiteColor} />
            </TouchableOpacity>
          )}
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
    width: 270,
  },
  oldPrice: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
  image: {
    width: '100%',
    height: 150,
  },
  addButton: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },
  decreaseButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  increaseButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
