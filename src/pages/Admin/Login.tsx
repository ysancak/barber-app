import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Button, Input, View} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {adminLoginValidation} from '@/schemas/validations';
import {loginService} from '@/services/user.service';
import {setTokens} from '@/store/auth';
import {colors} from '@/utils';

function AdminLogin(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {fetch, data, loading} = useFetch(loginService);

  const formik = useFormik({
    initialValues: {username: '', password: ''},
    validationSchema: adminLoginValidation,
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
        source={require('@/assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View gap={10}>
        <Input.Text
          icon="person"
          placeholder={t('adminLogin.form.username.placeholder')}
          keyboardType="email-address"
          autoFocus
          onChange={formik.handleChange('username')}
          onBlur={() => formik.handleBlur('username')}
          value={formik.values.username}
          error={formik.touched.username && formik.errors.username}
        />
        <Input.Password
          icon="lock"
          placeholder={t('adminLogin.form.password.placeholder')}
          keyboardType="visible-password"
          onChange={formik.handleChange('password')}
          onBlur={() => formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <Button
          label={t('adminLogin.login')}
          onPress={formik.handleSubmit}
          loading={loading}
        />
      </View>
    </View>
  );
}

export default AdminLogin;

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
