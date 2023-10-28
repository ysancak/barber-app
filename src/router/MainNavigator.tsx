import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from '@/router/TabNavigator';
import {Text} from '@/components';

import {colors} from '@/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {EditProfile} from '@/pages';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

function MainNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerTintColor: colors.primaryColor,
        headerTitle: () => (
          <Text variant="content" semibold fontSize={17}>
            {route.params?.title || route.name}
          </Text>
        ),
        headerBackImage: () => (
          <Icon name="chevron-back" size={25} color={colors.primaryColor} />
        ),
        headerBackTitleStyle: {
          fontFamily: 'EncodeSans-Medium',
        },
        headerBackTitle: t('general.back'),
        headerBackTitleVisible: true,
      })}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        options={{title: t('editProfile.title')}}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
