import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from '@/router/AuthNavigator';
import MainNavigator from '@/router/MainNavigator';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
