import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';

import {
  HeaderRightButton,
  Input,
  KeyboardAvoidingView,
  SectionHeader,
  Text,
  View,
} from '@/components';
import {useFetch, useNavigation, useShoppingCart} from '@/hooks';
import {orderUserInfoSchema} from '@/schemas/validations';
import {createOrderService} from '@/services/saloon.service';
import {userMeService} from '@/services/user.service';
import {clearCart, resetCartUserInfo, setCartUserInfo} from '@/store/cart';
import {colors} from '@/utils';
import {AGB_URL} from '@/utils/constants';
import {showErrorToast} from '@/utils/toast';

const OrderUserInfo = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: {businessID},
  } = useRoute();
  const {fetch, data, retry, refreshing, loading} = useFetch(userMeService);
  const cart = useShoppingCart(businessID);

  useEffect(() => {
    fetch();
    dispatch(resetCartUserInfo({businessID}));
  }, [businessID]);

  navigation.setOptions({
    headerRight() {
      return (
        <HeaderRightButton
          title={t('general.save')}
          loading={formik.isSubmitting || loading}
          onPress={formik.submitForm}
          disabled={formik.isValid}
        />
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
      surname: data?.surname ?? '',
      email: data?.email ?? '',
      gsm: data?.gsm ?? '',
      street: data?.street ?? '',
      no: data?.no ?? '',
      postcode: data?.postcode ?? '',
      ort: data?.ort ?? '',
      note: '',
      agb: false,
    },
    enableReinitialize: true,
    validationSchema: orderUserInfoSchema,
    onSubmit: async values => {
      const body = {
        ...values,
        businessID,
        orderItems: cart.uniqueItems,
        startDate: cart.date.start ?? null,
        endDate: cart.date.end ?? null,
        couponCode: cart.coupon ?? null,
        workerID: cart.worker ?? null,
        orderPrice: cart.coupon
          ? cart.totalPriceAfterDiscount
          : cart.totalPrice,
      };

      const response = await createOrderService(body);

      if (response.delete) {
        dispatch(clearCart({businessID}));
        showErrorToast(t('shoppingCart.alert.cartContentChanged.title'));
        navigation.navigate('SaloonDetail', {businessID});
      } else if (response.link) {
        navigation.navigate('Payment', {businessID, link: response.link});
      }
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={retry} />
          }>
          <SectionHeader title={t('orderUserInfo.section.personal')} />
          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={10}>
              <View flex>
                <Input.Text
                  icon="person"
                  placeholder={t('orderUserInfo.form.name.placeholder')}
                  onChange={formik.handleChange('name')}
                  onBlur={() => formik.handleBlur('name')}
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors.name}
                />
              </View>
              <View flex>
                <Input.Text
                  icon="person"
                  placeholder={t('orderUserInfo.form.surname.placeholder')}
                  onChange={formik.handleChange('surname')}
                  onBlur={() => formik.handleBlur('surname')}
                  value={formik.values.surname}
                  error={formik.touched.surname && formik.errors.surname}
                />
              </View>
            </View>
            <Input.Text
              icon="email"
              placeholder={t('orderUserInfo.form.email.placeholder')}
              keyboardType="email-address"
              onChange={formik.handleChange('email')}
              onBlur={() => formik.handleBlur('email')}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            <Input.Text
              icon="phone"
              placeholder={t('orderUserInfo.form.gsm.placeholder')}
              keyboardType="phone-pad"
              onChange={formik.handleChange('gsm')}
              onBlur={() => formik.handleBlur('gsm')}
              value={formik.values.gsm}
              error={formik.touched.gsm && formik.errors.gsm}
            />
          </View>

          <SectionHeader title={t('orderUserInfo.section.address')} />
          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={10}>
              <View flex>
                <Input.Text
                  placeholder={t('orderUserInfo.form.street.placeholder')}
                  onChange={formik.handleChange('street')}
                  onBlur={() => formik.handleBlur('street')}
                  value={formik.values.street}
                  error={formik.touched.street && formik.errors.street}
                />
              </View>
              <View flex>
                <Input.Text
                  placeholder={t('orderUserInfo.form.no.placeholder')}
                  onChange={formik.handleChange('no')}
                  onBlur={() => formik.handleBlur('no')}
                  value={formik.values.no}
                  error={formik.touched.no && formik.errors.no}
                />
              </View>
            </View>
            <View flexDirection="row" gap={10}>
              <View flex>
                <Input.Text
                  placeholder={t('orderUserInfo.form.postcode.placeholder')}
                  onChange={formik.handleChange('postcode')}
                  onBlur={() => formik.handleBlur('postcode')}
                  value={formik.values.postcode}
                  error={formik.touched.postcode && formik.errors.postcode}
                />
              </View>
              <View flex>
                <Input.Text
                  placeholder={t('orderUserInfo.form.ort.placeholder')}
                  onChange={formik.handleChange('ort')}
                  onBlur={() => formik.handleBlur('ort')}
                  value={formik.values.ort}
                  error={formik.touched.ort && formik.errors.ort}
                />
              </View>
            </View>
            <Input.Text
              placeholder={t('orderUserInfo.form.note.placeholder')}
              onChange={formik.handleChange('note')}
              onBlur={() => formik.handleBlur('note')}
              value={formik.values.note}
              error={formik.touched.note && formik.errors.note}
            />
          </View>

          <View
            flexDirection="row"
            gap={10}
            alignItems="center"
            paddingHorizontal={16}
            paddingTop={10}>
            <CheckBox
              disabled={false}
              value={formik.values.agb}
              lineWidth={2}
              tintColor={colors.primaryColor}
              onCheckColor={colors.whiteColor}
              boxType="square"
              onFillColor={colors.primaryColor}
              onTintColor={colors.primaryColor}
              animationDuration={0}
              onValueChange={newValue => formik.setFieldValue('agb', newValue)}
            />
            <Text onPress={() => Linking.openURL(AGB_URL)}>
              {t('orderUserInfo.form.agb.placeholder')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrderUserInfo;

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
