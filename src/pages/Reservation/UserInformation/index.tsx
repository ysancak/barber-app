import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';

import {
  Button,
  Input,
  KeyboardAvoidingView,
  SectionHeader,
  View,
} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {reservationUserInfoSchema} from '@/schemas/validations';
import {userMeService} from '@/services/user.service';
import {colors} from '@/utils';

const ReservationUserInfo = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {fetch, data, retry, refreshing, loading} = useFetch(userMeService);

  useEffect(() => {
    fetch();
  }, []);

  navigation.setOptions({
    headerRight() {
      return (
        <Button
          variant="text"
          label={t('general.save')}
          loading={formik.isSubmitting || loading}
          onPress={formik.submitForm}
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
    },
    enableReinitialize: true,
    validationSchema: reservationUserInfoSchema,
    onSubmit: values => {
      console.log(values);
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
          <SectionHeader title="Kişisel bilgiler" />
          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={10}>
              <View flex>
                <Input.Text
                  icon="person"
                  placeholder={t('reservationUserInfo.form.name.placeholder')}
                  onChange={formik.handleChange('name')}
                  onBlur={() => formik.handleBlur('name')}
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors.name}
                />
              </View>
              <View flex>
                <Input.Text
                  icon="person"
                  placeholder={t(
                    'reservationUserInfo.form.surname.placeholder',
                  )}
                  onChange={formik.handleChange('surname')}
                  onBlur={() => formik.handleBlur('surname')}
                  value={formik.values.surname}
                  error={formik.touched.surname && formik.errors.surname}
                />
              </View>
            </View>
            <Input.Text
              icon="email"
              placeholder={t('reservationUserInfo.form.email.placeholder')}
              keyboardType="email-address"
              onChange={formik.handleChange('email')}
              onBlur={() => formik.handleBlur('email')}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            <Input.Text
              icon="phone"
              placeholder={t('reservationUserInfo.form.gsm.placeholder')}
              keyboardType="phone-pad"
              onChange={formik.handleChange('gsm')}
              onBlur={() => formik.handleBlur('gsm')}
              value={formik.values.gsm}
              error={formik.touched.gsm && formik.errors.gsm}
            />
          </View>

          <SectionHeader title="Adres bilgileri" />
          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={10}>
              <View flex>
                <Input.Text
                  placeholder={t('reservationUserInfo.form.street.placeholder')}
                  onChange={formik.handleChange('street')}
                  onBlur={() => formik.handleBlur('street')}
                  value={formik.values.street}
                  error={formik.touched.street && formik.errors.street}
                />
              </View>
              <View flex>
                <Input.Text
                  placeholder={t('reservationUserInfo.form.no.placeholder')}
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
                  placeholder={t(
                    'reservationUserInfo.form.postcode.placeholder',
                  )}
                  keyboardType="email-address"
                  onChange={formik.handleChange('postcode')}
                  onBlur={() => formik.handleBlur('postcode')}
                  value={formik.values.postcode}
                  error={formik.touched.postcode && formik.errors.postcode}
                />
              </View>
              <View flex>
                <Input.Text
                  placeholder={t('reservationUserInfo.form.ort.placeholder')}
                  keyboardType="email-address"
                  onChange={formik.handleChange('ort')}
                  onBlur={() => formik.handleBlur('ort')}
                  value={formik.values.ort}
                  error={formik.touched.ort && formik.errors.ort}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReservationUserInfo;

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
