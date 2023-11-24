import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {
  Button,
  Input,
  KeyboardAvoidingView,
  ListItem,
  SectionHeader,
  Text,
  View,
} from '@/components';
import {useNavigation, useShoppingCart} from '@/hooks';
import {addToCart, clearCart, removeFromCart} from '@/store/cart';
import {colors, constants} from '@/utils';

const ShoppingCart = () => {
  const {
    params: {businessID},
  } = useRoute();
  const {
    items,
    services,
    products,
    totalPrice,
    totalPriceAfterDiscount,
    calculatedDiscount,
    mwstList,
    subtotal,
  } = useShoppingCart(businessID);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightComponent,
    });
  }, [navigation]);

  useEffect(() => {
    if (totalPrice <= 0) {
      navigation.goBack();
    }
  }, [totalPrice, navigation]);

  const handleAddToCart = useCallback(
    (item: Product | Service) => {
      dispatch(addToCart({businessId: businessID, item}));
    },
    [businessID, dispatch],
  );

  const handleRemoveFromCart = useCallback(
    (item: Product | Service) => {
      dispatch(removeFromCart({businessId: businessID, itemId: item._id}));
    },
    [businessID, dispatch],
  );

  const handleClearCart = () => {
    dispatch(clearCart({businessId: businessID}));
  };

  const HeaderRightComponent = () => (
    <TouchableOpacity onPress={handleClearCart}>
      <View style={styles.headerRight}>
        <Icon name="delete-outline" size={26} color={colors.primaryColor} />
      </View>
    </TouchableOpacity>
  );

  const renderServices = useMemo(() => {
    if (services.length > 0) {
      return (
        <>
          <SectionHeader title="Servisler" />

          {services.map((service: Service) => (
            <View key={`service-${service._id}`} style={styles.serviceItem}>
              <View style={styles.serviceItemTextContainer}>
                <Text>{service.serviceName}</Text>
                <Text semibold fontSize={18} color={colors.primaryColor}>
                  {service.price} {constants.CURRENCY}
                </Text>
                <View style={styles.iconTextContainer}>
                  <Icon
                    name="timer"
                    size={22}
                    color={colors.captionTextColor}
                  />
                  <Text variant="caption">{service.durationMinutes}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemoveFromCart(service)}>
                <Icon
                  name="delete-outline"
                  size={26}
                  color={colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
          ))}
        </>
      );
    }

    return <></>;
  }, [services, handleRemoveFromCart]);

  const renderProducts = useMemo(() => {
    if (products.length > 0) {
      const uniqueProductsMap = new Map();

      items
        .filter(item => item.productName)
        .forEach((product: Product) => {
          if (!uniqueProductsMap.has(product._id)) {
            uniqueProductsMap.set(product._id, {product, quantity: 1});
          } else {
            const existingProduct = uniqueProductsMap.get(product._id);
            uniqueProductsMap.set(product._id, {
              product,
              quantity: existingProduct.quantity + 1,
            });
          }
        });

      return (
        <>
          <SectionHeader title="Ürünler" />

          {Array.from(uniqueProductsMap.values()).map(({product, quantity}) => {
            return (
              <View key={product._id} style={styles.productItem}>
                <View style={styles.productItemInnerContainer}>
                  <Image
                    source={{uri: product.productImage}}
                    style={styles.productImage}
                  />
                  <View style={styles.productDescription}>
                    <Text>{product.productName}</Text>
                    <Text semibold fontSize={18} color={colors.primaryColor}>
                      {product.price} {constants.CURRENCY}
                    </Text>
                  </View>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.decreaseButton}
                    onPress={() => handleRemoveFromCart(product)}>
                    <Icon name="remove" size={22} color={colors.whiteColor} />
                  </TouchableOpacity>

                  <Text medium fontSize={18} color={colors.whiteColor}>
                    {quantity}
                  </Text>

                  <TouchableOpacity
                    style={styles.increaseButton}
                    onPress={() => handleAddToCart(product)}>
                    <Icon name="add" size={22} color={colors.whiteColor} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </>
      );
    }
    return <></>;
  }, [products, items, handleAddToCart, handleRemoveFromCart]);

  const renderPrice = useMemo(() => {
    return (
      <>
        <SectionHeader title="Fiyat" />
        <ListItem
          label="Subtotal"
          value={`${subtotal.toFixed(2)} ${constants.CURRENCY}`}
        />
        {mwstList.map(mwst => (
          <ListItem
            key={mwst.mwstName}
            label={mwst.mwstName}
            value={`${mwst.total} ${constants.CURRENCY}`}
          />
        ))}
        {calculatedDiscount && (
          <ListItem
            icon="savings"
            label="İndirim"
            value={`${calculatedDiscount.toFixed(2)} ${constants.CURRENCY}`}
          />
        )}
        <ListItem
          icon="credit-card"
          label="Total price"
          value={`${
            calculatedDiscount
              ? totalPriceAfterDiscount.toFixed(2)
              : totalPrice.toFixed(2)
          } ${constants.CURRENCY}`}
        />
      </>
    );
  }, [
    totalPrice,
    calculatedDiscount,
    mwstList,
    subtotal,
    totalPriceAfterDiscount,
  ]);

  const renderCouponCode = useMemo(() => {
    return (
      <>
        <SectionHeader title="Kupon kodu" />
        <View
          paddingHorizontal={16}
          paddingVertical={12}
          style={{backgroundColor: colors.whiteColor}}>
          <Input.Coupon businessID={businessID} />
        </View>
      </>
    );
  }, [businessID]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView style={styles.scrollView}>
          {renderServices}
          {renderProducts}
          {renderPrice}
          {renderCouponCode}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Button
          label="Devam et"
          onPress={() => navigation.navigate('Calendar')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.bgColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
  serviceItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    gap: 12,
  },
  serviceItemTextContainer: {
    flex: 1,
    gap: 8,
  },
  iconTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  productItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    gap: 16,
  },
  productItemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  productImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor3,
  },
  productDescription: {
    gap: 8,
    flex: 1,
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
  headerRight: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.borderColor3,
    backgroundColor: colors.whiteColor,
  },
});
