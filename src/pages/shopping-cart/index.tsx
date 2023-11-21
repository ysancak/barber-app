import {useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {Button, ListItem, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {addToCart, clearCart, removeFromCart} from '@/store/cart';
import {colors, constants} from '@/utils';

const ShoppingCart = () => {
  const {
    params: {businessID},
  } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const businessCart = useSelector(state => state.cart.carts[businessID]);

  const services = useMemo(
    () =>
      businessCart ? businessCart.items.filter(item => item.serviceName) : [],
    [businessCart],
  );

  const products = useMemo(
    () =>
      businessCart ? businessCart.items.filter(item => item.productName) : [],
    [businessCart],
  );

  const totalPrice = useMemo(() => {
    const calculatedTotalPrice = businessCart
      ? Math.abs(businessCart.totalPrice)
      : 0;
    const _totalPrice = calculatedTotalPrice < 0.01 ? 0 : calculatedTotalPrice;
    return _totalPrice;
  }, [businessCart]);

  const calculateMwstTotals = () => {
    const mwstTotals = new Map();
    let totalMwst = 0;

    businessCart?.items.forEach(item => {
      const currentTotal = mwstTotals.get(item.mwstName) || 0;
      const mwstValue = parseFloat(item.mwstPrice);
      totalMwst += mwstValue;
      mwstTotals.set(item.mwstName, currentTotal + mwstValue);
    });

    return {
      mwstList: Array.from(mwstTotals).map(([name, total]) => ({
        mwstName: name,
        total: total.toFixed(2),
      })),
      totalMwst,
    };
  };

  const {mwstList, totalMwst} = useMemo(calculateMwstTotals, [businessCart]);

  const subtotal = useMemo(() => {
    return totalPrice - totalMwst;
  }, [totalPrice, totalMwst]);

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

  const handleAddToCart = (item: Product | Service) => {
    dispatch(addToCart({businessId: businessID, item}));
  };

  const handleRemoveFromCart = (item: Product | Service) => {
    dispatch(removeFromCart({businessId: businessID, itemId: item._id}));
  };

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
          <View style={styles.sectionHeader}>
            <Text variant="title" fontSize={16}>
              Servisler
            </Text>
          </View>

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
  }, [services]);

  const renderProducts = useMemo(() => {
    if (products.length > 0) {
      const uniqueProductsMap = new Map();

      businessCart.items
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
          <View style={styles.sectionHeader}>
            <Text variant="title" fontSize={16}>
              Ürünler
            </Text>
          </View>
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
  }, [products, businessCart]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderServices}

        {renderProducts}

        <View style={styles.sectionHeader}>
          <Text variant="title" fontSize={16}>
            Fiyat
          </Text>
        </View>
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
        <ListItem
          icon="credit-card"
          label="Total price"
          value={`${totalPrice.toFixed(2)} ${constants.CURRENCY}`}
        />
      </ScrollView>
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
