import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Button, Input, SafeAreaView, Space, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {useFormik} from 'formik';
import {registerAndLoginValidationSchema} from '@/schemas/validations';
import {registerService} from '@/services/auth.service';
import {useDispatch} from 'react-redux';
import {setTokens} from '@/store/auth';
import {useTranslation} from 'react-i18next';

function Register(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: registerAndLoginValidationSchema,
    onSubmit: async values => {
      setLoading(true);
      try {
        const result = await registerService(values);
        if (result) {
          dispatch(
            setTokens({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            }),
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <SafeAreaView flex gap={16} paddingHorizontal={16} paddingTop={16}>
      <Text variant="title" textAlign="center">
        {t('loginAndRegister.register')}
      </Text>
      <View paddingVertical={18}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View gap={8}>
        <Input.Text
          icon="email"
          placeholder={t('loginAndRegister.form.email.placeholder')}
          keyboardType="email-address"
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
    </SafeAreaView>
  );
}

export default Register;

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 80,
  },
});
