import {clearTokens} from '@/store/auth';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {useDispatch} from 'react-redux';

function Home(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>Home</Text>

      <Button
        title="Delete Refresh Token"
        onPress={() => dispatch(clearTokens())}
      />
    </SafeAreaView>
  );
}

export default Home;
