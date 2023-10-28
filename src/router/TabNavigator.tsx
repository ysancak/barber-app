import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {HeaderTitle, Text} from '@/components';
import {Home, MyAccount} from '@/pages';
import {colors} from '@/utils';

const Tab = createBottomTabNavigator();

function TabNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitle(props) {
          return <HeaderTitle title={props.children} />;
        },
        tabBarIcon: ({focused, color}) => {
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
        options={{
          title: t('myAccount.title'),
        }}
        component={MyAccount}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
