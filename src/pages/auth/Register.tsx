import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Button, Input, SafeAreaView, Space, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';

function Register(): JSX.Element {
  const navigation = useNavigation();

  return (
    <SafeAreaView flex gap={16} paddingHorizontal={16} paddingTop={16}>
      <Text variant="title" textAlign="center">
        Kayıt ol
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
          placeholder="Email adresinizi girin"
          keyboardType="email-address"
        />
        <Input.Password
          icon="lock"
          placeholder="Şifrenizi girin"
          keyboardType="visible-password"
        />
        <Button label="Kayıt ol" />
        <Space />
        <Text textAlign="center" variant="caption">
          YADA
        </Text>
        <Space />
        <Button
          variant="secondary"
          label="Giriş yap"
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
