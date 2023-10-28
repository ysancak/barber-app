import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from '@/components';
import {colors} from '@/utils';

import {Home, MyAccount} from '@/pages';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

function TabNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitle: () => (
          <Text variant="content" semibold fontSize={17}>
            {route.name}
          </Text>
        ),
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Shop') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Campaigns') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'MyAccount') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName as string} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primaryColor,
        inactiveTintColor: colors.captionTextColor,
        labelStyle: {
          fontFamily: 'EncodeSans-Medium',
          fontSize: 12,
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={() => <Text>Ara</Text>} />
      <Tab.Screen name="Shop" component={() => <Text>Market</Text>} />
      <Tab.Screen name="Campaigns" component={() => <Text>Kampanyalar</Text>} />
      <Tab.Screen
        name="MyAccount"
        options={{title: t('myAccount.title')}}
        component={MyAccount}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
