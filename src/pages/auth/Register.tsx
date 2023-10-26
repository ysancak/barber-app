import {registerService} from '@/services/auth.service';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

function Register(): JSX.Element {
  const registerHandler = async () => {
    await registerService({email: 'yusuf@yusuf.com', password: '1232'});
  };

  return (
    <SafeAreaView>
      <Text>Register</Text>
      <Button title="Kayıt ol" onPress={registerHandler}></Button>
    </SafeAreaView>
  );
}

export default Register;
