import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from '@/router/AuthNavigator';
import MainNavigator from '@/router/MainNavigator';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

function RootNavigator() {
  const {accessToken} = useSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {accessToken ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
