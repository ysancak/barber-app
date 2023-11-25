import {useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {Button, SafeAreaView, SectionHeader, View, Text} from '@/components';
import {useNavigation, useShoppingCart} from '@/hooks';
import {colors} from '@/utils';
import {wp} from '@/utils/responsive';

const OrderResult = () => {
  const {
    params: {businessID},
  } = useRoute();

  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const cart = useShoppingCart(businessID);

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  const renderServices = useMemo(() => {
    return cart.services.length > 0 ? (
      <>
        <SectionHeader title={t('orderResult.section.services')} />
        {cart.services.map(service => (
          <View key={`service-${service._id}`} style={styles.serviceItem}>
            <Text>{service.serviceName}</Text>
            <Text variant="caption">
              {t('general.byMinute', {minute: service.durationMinutes})}
            </Text>
          </View>
        ))}
      </>
    ) : null;
  }, [cart.services, t]);

  const renderProducts = useMemo(() => {
    return cart.uniqueProducts.length > 0 ? (
      <>
        <SectionHeader title={t('orderResult.section.products')} />
        {cart.uniqueProducts.map(({product, quantity}) => (
          <View key={`product-${product._id}`} style={styles.productItem}>
            <View style={styles.productQuantity}>
              <Text color={colors.whiteColor}>{quantity}</Text>
            </View>
            <Text>{product.productName}</Text>
          </View>
        ))}
      </>
    ) : null;
  }, [cart.uniqueProducts, t]);

  const renderServiceDate = useMemo(() => {
    return cart.detail.date ? (
      <View style={styles.serviceDateContainer}>
        <Text textAlign="center" fontSize={40} bold>
          {moment(cart.detail.date.start).format('HH:mm')}
        </Text>
        <Text textAlign="center" fontSize={20} bold>
          {`${moment(cart.detail.date.start).format('LL')} - ${moment(
            cart.detail.date.start,
          ).format('dddd')}`}
        </Text>
        <Text textAlign="center">{t('orderResult.serviceDateInfo')}</Text>
      </View>
    ) : null;
  }, [cart.detail.date, t]);

  const renderUserInfo = useMemo(() => {
    const user = cart.detail.user;
    const userInfoString = `${user.name} ${user.surname}, ${user.street} ${
      user.no
    } ${user.postcode} ${user.ort || ''} \n${user.gsm}\n${user.email}`;
    return (
      <View style={styles.userInfoContainer}>
        <SectionHeader title={t('orderResult.section.billingAddress')} />
        <View style={styles.userTextContainer}>
          <Text>{userInfoString}</Text>
        </View>
      </View>
    );
  }, [cart.detail.user, t]);

  const renderTitle = useMemo(() => {
    return cart.serviceCount <= 0 && cart.productCount > 0
      ? t('orderResult.title.order')
      : t('orderResult.title.reservation');
  }, [cart.productCount, cart.serviceCount, t]);

  const onFinishHandler = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'Tabs'}],
    });
  };

  return (
    <SafeAreaView flex style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View alignItems="center" paddingVertical={16}>
          <LottieView
            source={require('@/assets/animations/success.json')}
            style={styles.animation}
            autoPlay
            loop={false}
            resizeMode="cover"
          />
          <View paddingHorizontal={wp(10)} gap={12}>
            <Text fontSize={22} textAlign="center" bold>
              {renderTitle}
            </Text>
          </View>
        </View>

        {renderServiceDate}
        <View style={styles.contentContainer}>
          {renderServices}
          {renderProducts}
          {renderUserInfo}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button label={t('general.continue')} onPress={onFinishHandler} />
      </View>
    </SafeAreaView>
  );
};

export default OrderResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  scrollContainer: {
    flex: 1,
  },
  animation: {
    width: 140,
    height: 140,
  },
  contentContainer: {
    paddingTop: 20,
  },
  serviceItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
  productItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productQuantity: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: colors.secondaryColor,
  },
  serviceDateContainer: {
    padding: 30,
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#00000010',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
  },
  userInfoContainer: {},
  userTextContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.borderColor3,
    backgroundColor: colors.whiteColor,
  },
});
