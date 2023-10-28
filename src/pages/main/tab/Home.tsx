import {useNavigation} from '@/hooks/useNavigation';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

function Home(): JSX.Element {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

export default Home;
