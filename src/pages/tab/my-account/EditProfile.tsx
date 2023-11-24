import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

import {
  Button,
  Input,
  KeyboardAvoidingView,
  SectionHeader,
  View,
} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {updateUserProfileSchema} from '@/schemas/validations';
import {updateUserProfileService, userMeService} from '@/services/user.service';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

function EditProfile(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {fetch, data, refresh, refreshing, loading} = useFetch(userMeService);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    formik.setValues({...data});
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      gsm: '',
      password: '',
      passwordConfirmation: '',
      street: '',
      no: '',
      postcode: '',
      ort: '',
    },
    validationSchema: updateUserProfileSchema,
    onSubmit: values => {
      const {password, passwordConfirmation} = values;

      if (
        (password.length > 0 || passwordConfirmation.length > 0) &&
        password !== passwordConfirmation
      ) {
        formik.setErrors({
          password: t('editProfile.form.password.error.match'),
          passwordConfirmation: t('editProfile.form.password.error.match'),
        });
        return;
      }

      navigation.navigate('PasswordConfirmation', {onSuccess: onUpdateHandler});
    },
  });

  const onUpdateHandler = async () => {
    try {
      console.log(formik.values);
      const result = await updateUserProfileService(formik.values);
      if (result) {
        showSuccessToast(t('editProfile.toast.savedSuccess'));
      }
    } finally {
      formik.setSubmitting(false);
    }
  };

  navigation.setOptions({
    headerRight() {
      return (
        <Button
          variant="text"
          label={t('general.save')}
          loading={loading || refreshing}
          onPress={formik.submitForm}
        />
      );
    },
  });

  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        <SectionHeader title="Kişisel bilgiler" />
        <View paddingHorizontal={16} gap={10} paddingVertical={12}>
          <View flexDirection="row" gap={10}>
            <View flex>
              <Input.Text
                icon="person"
                placeholder={t('editProfile.form.name.placeholder')}
                onChange={formik.handleChange('name')}
                onBlur={() => formik.handleBlur('name')}
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
              />
            </View>
            <View flex>
              <Input.Text
                icon="person"
                placeholder={t('editProfile.form.surname.placeholder')}
                onChange={formik.handleChange('surname')}
                onBlur={() => formik.handleBlur('surname')}
                value={formik.values.surname}
                error={formik.touched.surname && formik.errors.surname}
              />
            </View>
          </View>
          <Input.Text
            icon="email"
            placeholder={t('editProfile.form.email.placeholder')}
            keyboardType="email-address"
            onChange={formik.handleChange('email')}
            onBlur={() => formik.handleBlur('email')}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
          <Input.Text
            icon="phone"
            placeholder={t('editProfile.form.gsm.placeholder')}
            keyboardType="phone-pad"
            onChange={formik.handleChange('gsm')}
            onBlur={() => formik.handleBlur('gsm')}
            value={formik.values.gsm}
            error={formik.touched.gsm && formik.errors.gsm}
          />
          <Input.Password
            icon="key"
            placeholder={t('editProfile.form.password.placeholder')}
            keyboardType="visible-password"
            onChange={formik.handleChange('password')}
            onBlur={() => formik.handleBlur('password')}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />
          {formik.values.password?.length > 0 && (
            <Input.Password
              icon="key"
              placeholder={t(
                'editProfile.form.passwordConfirmation.placeholder',
              )}
              keyboardType="visible-password"
              onChange={formik.handleChange('passwordConfirmation')}
              onBlur={() => formik.handleBlur('passwordConfirmation')}
              value={formik.values.passwordConfirmation}
              error={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
            />
          )}
        </View>

        <SectionHeader title="Adres bilgileri" />
        <View paddingHorizontal={16} gap={10} paddingVertical={12}>
          <View flexDirection="row" gap={10}>
            <View flex>
              <Input.Text
                placeholder={t('editProfile.form.street.placeholder')}
                onChange={formik.handleChange('street')}
                onBlur={() => formik.handleBlur('street')}
                value={formik.values.street}
                error={formik.touched.street && formik.errors.street}
              />
            </View>
            <View flex>
              <Input.Text
                placeholder={t('editProfile.form.no.placeholder')}
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
                placeholder={t('editProfile.form.postcode.placeholder')}
                keyboardType="email-address"
                onChange={formik.handleChange('postcode')}
                onBlur={() => formik.handleBlur('postcode')}
                value={formik.values.postcode}
                error={formik.touched.postcode && formik.errors.postcode}
              />
            </View>
            <View flex>
              <Input.Text
                placeholder={t('editProfile.form.ort.placeholder')}
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
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});
