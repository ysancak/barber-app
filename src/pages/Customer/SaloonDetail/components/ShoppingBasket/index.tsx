import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {useNavigation, useShoppingCart} from '@/hooks';
import {colors, constants} from '@/utils';

type Props = {
  businessID: string;
};

const ShoppingBasket: React.FC<Props> = ({businessID}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const cart = useShoppingCart(businessID);

  const animatedValue = useRef(
    new Animated.Value(cart.totalPrice > 0 ? 0 : 1),
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: cart.totalPrice > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [cart.totalPrice, animatedValue]);

  const animatedStyle = {
    opacity: cart.totalPrice > 0 ? animatedValue : 0,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [140, 0],
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
              <Text color={colors.textColor}>
                {t('saloonDetail.shoppingBasket.serviceCount', {
                  serviceCount: cart.serviceCount,
                })}
              </Text>
            </View>
            <View style={styles.iconTextWrapper}>
              <Icon name={'storefront'} size={22} color={colors.textColor} />
              <Text color={colors.textColor}>
                {t('saloonDetail.shoppingBasket.productCount', {
                  productCount: cart.productCount,
                })}
              </Text>
            </View>
          </View>
          <Text variant="title" fontSize={22} color={colors.textColor}>
            {cart.discount
              ? cart.totalPriceAfterDiscount.toFixed(2)
              : cart.totalPrice.toFixed(2)}{' '}
            {constants.CURRENCY}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ShoppingCart', {businessID})}>
            <Text medium color={colors.whiteColor}>
              {t('saloonDetail.shoppingBasket.action')}
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
