import React from 'react';

import {registerService} from '@/services/auth.service';
import {Text} from '@/components';
import {SafeAreaView} from 'react-native-safe-area-context';

function Register(): JSX.Element {
  const registerHandler = async () => {
    await registerService({email: 'yusuf@yusuf.com', password: '1232'});
  };

  return (
    <SafeAreaView>
      <Text variant="title" fontSize={35} textAlign="center">
        Kayıt ol
      </Text>
      <Text textAlign="center">dgfgfg</Text>
    </SafeAreaView>
  );
}

export default Register;
