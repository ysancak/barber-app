import {useRoute} from '@react-navigation/native';
import 'moment/min/locales';

import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {
  Button,
  ErrorResult,
  ListItem,
  SafeAreaView,
  SectionHeader,
  Text,
  View,
} from '@/components';
import {useNavigation, useShoppingCart} from '@/hooks';
import {colors, constants} from '@/utils';
import {wp} from '@/utils/responsive';

const OrderResult = () => {
  const {
    params: {businessID},
  } = useRoute();
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const cart = useShoppingCart(businessID);

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  const renderServices = useMemo(() => {
    if (cart.services.length > 0) {
      return (
        <>
          <SectionHeader title="Servisler" />

          {cart.services.map((service: Service) => (
            <View
              key={`service-${service._id}`}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: colors.borderColor3,
              }}>
              <Text>{service.serviceName}</Text>
              <Text variant="caption">{service.durationMinutes}</Text>
            </View>
          ))}
        </>
      );
    }

    return <></>;
  }, [cart.services]);

  const renderProducts = useMemo(() => {
    if (cart.uniqueProducts.length > 0) {
      return (
        <>
          <SectionHeader title="Ürünler" />

          {cart.uniqueProducts.map(({product, quantity}) => (
            <View
              key={`product-${product._id}`}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: colors.borderColor3,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <View
                style={{
                  padding: 6,
                  borderRadius: 4,
                  backgroundColor: colors.secondaryColor,
                }}>
                <Text color={colors.whiteColor}>{quantity}</Text>
              </View>
              <Text>{product.productName}</Text>
            </View>
          ))}
        </>
      );
    }

    return <></>;
  }, [cart.uniqueProducts]);

  const renderServiceDate = useMemo(() => {
    if (!cart.detail.date) {
      return;
    }
    return (
      <View
        padding={30}
        gap={12}
        alignItems="center"
        style={{
          backgroundColor: '#00000010',
          borderRadius: 12,
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <Text textAlign="center" fontSize={40} bold>
          {moment(cart.detail.date.start).format('HH:mm')}
        </Text>
        <Text textAlign="center" fontSize={20} bold>
          {`${moment(cart.detail.date.start).format('LL')} - ${moment(
            cart.detail.date,
          ).format('dddd')}`}
        </Text>
        <Text textAlign="center">
          Rezervasyon saatinizden önce lütfen belirtilen adreste olun
        </Text>
      </View>
    );
  }, [cart.detail.date]);

  const renderBusinessInfo = useMemo(() => {
    return (
      <View>
        <SectionHeader title="Salon bilgileri" />
        <ListItem label="Kuaför adı" />
        <ListItem icon="phone" label="+454545454545" />
        <ListItem icon="map" label="Adres bilgisi" />
      </View>
    );
  }, []);

  const renderUserInfo = useMemo(() => {
    return (
      <View>
        <SectionHeader title="Fatura adresi" />
        <View paddingHorizontal={16} paddingVertical={12}>
          <Text>Yusuf Sancak, Çankaya Mahallesi 34 Sokak Konak, İzmir</Text>
        </View>
      </View>
    );
  }, []);

  const renderTitle = useMemo(() => {
    if (cart.serviceCount <= 0 && cart.productCount > 0) {
      return 'Sipariş oluşturuldu';
    } else {
      return 'Rezervasyon oluşturuldu';
    }
  }, []);

  const onFinishHandler = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'Tabs'}],
    });
  };

  return (
    <SafeAreaView flex style={styles.container}>
      <ScrollView style={styles.container}>
        <View alignItems="center" paddingVertical={16}>
          <LottieView
            source={require('@/assets/animations/success.json')}
            style={{width: 140, height: 140}}
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

        <View paddingTop={20}>
          {renderServices}
          {renderProducts}
          {renderUserInfo}
          {renderBusinessInfo}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button label="Devam et" onPress={onFinishHandler} />
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
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.borderColor3,
    backgroundColor: colors.whiteColor,
  },
});
