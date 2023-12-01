import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {HeaderTitle} from '@/components';
import {Campaigns, Favorites, Home, MyAccount, Search} from '@/pages';
import {colors} from '@/utils';

const Tab = createBottomTabNavigator();

function TabNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.captionTextColor,
        tabBarLabelStyle: {
          fontFamily: 'EncodeSans-Medium',
          fontSize: 12,
        },
        headerTitle(props) {
          return <HeaderTitle title={props.children} />;
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Campaigns') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'MyAccount') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName as string} size={24} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, title: t('home.title')}}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{title: t('search.title')}}
      />
      <Tab.Screen
        name="Campaigns"
        component={Campaigns}
        options={{title: t('campaigns.title')}}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{title: t('favorites.title')}}
      />
      <Tab.Screen
        name="MyAccount"
        options={{
          title: t('myAccount.title'),
        }}
        component={MyAccount}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
