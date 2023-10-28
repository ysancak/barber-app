import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register} from '@/pages';

const Stack = createStackNavigator();

function AuthNavigator(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
