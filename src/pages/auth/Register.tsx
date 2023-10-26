import React from 'react';
import {Button, SafeAreaView} from 'react-native';

import {registerService} from '@/services/auth.service';
import {Text} from '@/components';

function Register(): JSX.Element {
  const registerHandler = async () => {
    await registerService({email: 'yusuf@yusuf.com', password: '1232'});
  };

  return (
    <SafeAreaView>
      <Text variant="title" color="red">
        This is a title
      </Text>
      <Text variant="content">This is some content</Text>
      <Text variant="subtitle">This is a subtitle</Text>
      <Text variant="caption">This is a caption</Text>
    </SafeAreaView>
  );
}

export default Register;
