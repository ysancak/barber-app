import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

type Props = {
  businessID: string;
};

const ShoppingBasket: React.FC<Props> = ({businessID}) => {
  const navigation = useNavigation();
  const businessCart = useSelector(state => state.cart.carts[businessID]);

  const totalServices = useMemo(
    () =>
      businessCart
        ? businessCart.items.filter(item => item.serviceName).length
        : 0,
    [businessCart],
  );

  const totalProducts = useMemo(
    () =>
      businessCart
        ? businessCart.items.filter(item => item.productName).length
        : 0,
    [businessCart],
  );

  const totalPrice = useMemo(() => {
    const calculatedTotalPrice = businessCart
      ? Math.abs(businessCart.totalPrice)
      : 0;
    const _totalPrice = calculatedTotalPrice < 0.01 ? 0 : calculatedTotalPrice;
    return _totalPrice;
  }, [businessCart]);

  const animatedValue = useRef(
    new Animated.Value(totalPrice > 0 ? 0 : 1),
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: totalPrice > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [totalPrice, animatedValue]);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <View style={styles.infoSection}>
            <View style={styles.iconTextWrapper}>
              <Icon name={'content-cut'} size={22} color={colors.textColor} />
              <Text color={colors.textColor}>{totalServices} servis</Text>
            </View>
            <View style={styles.iconTextWrapper}>
              <Icon name={'storefront'} size={22} color={colors.textColor} />
              <Text color={colors.textColor}>{totalProducts} ürün</Text>
            </View>
          </View>
          <Text variant="title" fontSize={22} color={colors.textColor}>
            {totalPrice.toFixed(2)} TL
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ShoppingCart')}>
            <Text medium color={colors.whiteColor}>
              Sepete git
            </Text>
            <Icon name={'chevron-right'} size={30} color={colors.whiteColor} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default ShoppingBasket;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 0,
    backgroundColor: colors.bgColor,
    borderColor: colors.borderColor3,
    borderRadius: 0,
    borderTopWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowColor: colors.secondaryColor,
    shadowRadius: 20,
    paddingLeft: 22,
    paddingRight: 16,
    paddingVertical: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 26,
  },
  infoWrapper: {
    gap: 16,
    flex: 1,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
