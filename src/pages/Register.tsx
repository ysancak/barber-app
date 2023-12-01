import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Button, Input, Space, Text, View} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {registerAndLoginValidationSchema} from '@/schemas/validations';
import {registerService} from '@/services/user.service';
import {setTokens} from '@/store/auth';
import {colors} from '@/utils';

function Register(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {fetch, data, loading} = useFetch(registerService);

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: registerAndLoginValidationSchema,
    onSubmit: async values => fetch(values),
  });

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
      navigation.goBack();
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View gap={10}>
        <Input.Text
          icon="email"
          placeholder={t('loginAndRegister.form.email.placeholder')}
          keyboardType="email-address"
          autoFocus
          onChange={formik.handleChange('email')}
          onBlur={() => formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <Input.Password
          icon="lock"
          placeholder={t('loginAndRegister.form.password.placeholder')}
          keyboardType="visible-password"
          onChange={formik.handleChange('password')}
          onBlur={() => formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <Button
          label={t('loginAndRegister.register')}
          onPress={formik.handleSubmit}
          loading={loading}
        />
        <Space />
        <Text textAlign="center" variant="caption">
          {t('general.or')}
        </Text>
        <Space />
        <Button
          variant="secondary"
          label={t('loginAndRegister.login')}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.whiteColor,
  },
  logo: {
    width: '100%',
    height: 80,
    marginTop: 16,
    marginBottom: 8,
  },
});
