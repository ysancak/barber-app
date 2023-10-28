import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {HeaderTitle} from '@/components';
import {EditProfile} from '@/pages';
import TabNavigator from '@/router/TabNavigator';
import {colors} from '@/utils';

const Stack = createStackNavigator();

function MainNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTintColor: colors.primaryColor,
        headerTitle(props) {
          return <HeaderTitle title={props.children} />;
        },
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
        options={{
          title: t('editProfile.title'),
        }}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
