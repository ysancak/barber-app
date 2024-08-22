import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {HeaderRightButton, Input, Text, View} from '@/components';
import {useNavigation} from '@/hooks';
import {passwordConfirmationSchema} from '@/schemas/validations';
import {passwordConfirmationService} from '@/services/user.service';
import {colors} from '@/utils';

const PasswordConfirmation = () => {
  const {t} = useTranslation();
  const {params} = useRoute();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: passwordConfirmationSchema,
    onSubmit: async values => {
      const {password, passwordConfirmation} = values;

      if (
        (password?.length > 0 || passwordConfirmation?.length > 0) &&
        password !== passwordConfirmation
      ) {
        formik.setErrors({
          password: t('passwordConfirmation.form.password.error.match'),
          passwordConfirmation: t(
            'passwordConfirmation.form.password.error.match',
          ),
        });
        return;
      }

      await fetchService();
    },
  });

  const fetchService = async () => {
    try {
      const result = await passwordConfirmationService(formik.values);
      if (result) {
        params?.onSuccess();
        navigation.goBack();
      }
    } finally {
      formik.setSubmitting(false);
    }
  };

  navigation.setOptions({
    headerRight() {
      return (
        <HeaderRightButton
          title={t('general.save')}
          loading={formik.isSubmitting}
          onPress={formik.submitForm}
        />
      );
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{gap: 4}}>
      <View paddingBottom={16}>
        <Text>{t('passwordConfirmation.description')}</Text>
      </View>
      <Input.Password
        icon="key"
        placeholder={t('passwordConfirmation.form.password.placeholder')}
        keyboardType="visible-password"
        onChange={formik.handleChange('password')}
        onBlur={() => formik.handleBlur('password')}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
      />
      <Input.Password
        icon="key"
        placeholder={t(
          'passwordConfirmation.form.passwordConfirmation.placeholder',
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
    </ScrollView>
  );
};

export default PasswordConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
