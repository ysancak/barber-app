import React, {useMemo} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {Text, View} from '@/components';
import {addToCart, removeFromCart} from '@/store/cart';
import {colors, constants} from '@/utils';

const ProductItem: React.FC<Product> = product => {
  const {
    _id,
    description,
    price,
    oldprice,
    productImage,
    productName,
    businessID,
  } = product;
  const dispatch = useDispatch();
  const businessCart = useSelector(state => state.cart.carts[businessID]);

  const productQuantity = useMemo(
    () =>
      businessCart
        ? businessCart.items.filter(item => item._id === _id).length
        : 0,
    [businessCart, _id],
  );

  const handleAddToCart = () => {
    dispatch(addToCart({businessId: businessID, item: product}));
  };

  const handleRemoveFromCart = () => {
    if (productQuantity > 0) {
      dispatch(removeFromCart({businessId: businessID, itemId: _id}));
    }
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
          {description && <Text>{description}</Text>}
        </View>
        <View flexDirection="row" alignItems="center" gap={22}>
          <View flex gap={4}>
            <Text variant="title" fontSize={20} color={colors.primaryColor}>
              {price} {constants.CURRENCY}
            </Text>

            {oldprice && (
              <Text
                variant="title"
                fontSize={16}
                style={styles.oldPrice}
                color={colors.captionTextColor}>
                {oldprice} {constants.CURRENCY}
              </Text>
            )}
          </View>
          {productQuantity > 0 ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.decreaseButton}
                onPress={handleRemoveFromCart}>
                <Icon name="remove" size={22} color={colors.whiteColor} />
              </TouchableOpacity>

              <Text medium fontSize={18} color={colors.whiteColor}>
                {productQuantity}
              </Text>

              <TouchableOpacity
                style={styles.increaseButton}
                onPress={handleAddToCart}>
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
    padding: 12,
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
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  increaseButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
