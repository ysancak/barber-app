import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {navigationRef} from './root.navigation';
import CustomerTabNavigator from './TabNavigator';

import {HeaderTitle} from '@/components';
import {useAuth} from '@/hooks';
import {
  AdminAddWorker,
  AdminCalendar,
  AdminDashboard,
  AdminLogin,
  AdminWorkerDayOffs,
  AdminWorkerManagement,
  AdminWorkers,
} from '@/pages/Admin';
import {
  AddressInputDetail,
  Calendar,
  EditProfile,
  Faq,
  LanguageSettings,
  Login,
  MapListing,
  PasswordConfirmation,
  Register,
  OrderUserInfo,
  SaloonDetail,
  SelectInputDetail,
  Settings,
  ShoppingCart,
  OrderResult,
  Payment,
} from '@/pages/Customer';
import {colors} from '@/utils';

const Stack = createStackNavigator();

function MainNavigator(): JSX.Element {
  const {t} = useTranslation();
  const isAdminAuthenticated = useAuth('Admin');
  const startingPage: keyof RootStackParamList = isAdminAuthenticated
    ? 'AdminDashboard'
    : 'Tabs';
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={startingPage}
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
        })}>
        <Stack.Group>
          <Stack.Screen
            name="Tabs"
            component={CustomerTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            options={{
              title: t('loginAndRegister.login'),
            }}
            component={Login}
          />
          <Stack.Screen
            name="Register"
            options={{
              title: t('loginAndRegister.register'),
            }}
            component={Register}
          />
          <Stack.Screen
            name="EditProfile"
            options={{
              title: t('editProfile.title'),
            }}
            component={EditProfile}
          />
          <Stack.Screen
            name="Settings"
            options={{
              title: t('settings.title'),
            }}
            component={Settings}
          />
          <Stack.Screen
            name="LanguageSettings"
            options={{
              title: t('languageSettings.title'),
            }}
            component={LanguageSettings}
          />
          <Stack.Screen
            name="Faq"
            options={{
              title: t('faq.title'),
            }}
            component={Faq}
          />
          <Stack.Screen
            name="SelectInputDetail"
            component={SelectInputDetail}
            options={{presentation: 'modal'}}
          />
          <Stack.Screen
            name="SaloonDetail"
            component={SaloonDetail}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="MapListing"
            component={MapListing}
            options={{
              title: t('mapListing.title'),
            }}
          />
          <Stack.Screen
            name="AddressInputDetail"
            component={AddressInputDetail}
            options={{presentation: 'modal'}}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{title: t('shoppingCart.title')}}
          />
          <Stack.Screen
            name="Calendar"
            component={Calendar}
            options={{title: t('calendar.title')}}
          />
          <Stack.Screen
            name="PasswordConfirmation"
            options={{
              title: t('passwordConfirmation.title'),
              presentation: 'modal',
            }}
            component={PasswordConfirmation}
          />
          <Stack.Screen
            name="OrderUserInfo"
            component={OrderUserInfo}
            options={{title: t('orderUserInfo.title')}}
          />
          <Stack.Screen
            name="OrderResult"
            component={OrderResult}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name="Payment"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
            component={Payment}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="AdminLogin"
            options={{
              title: t('adminLogin.title'),
            }}
            component={AdminLogin}
          />
          <Stack.Screen
            name="AdminDashboard"
            options={{
              title: t('adminDashboard.title'),
              headerShown: false,
            }}
            component={AdminDashboard}
          />
          <Stack.Screen
            name="AdminCalendar"
            options={{
              title: 'Takvim',
            }}
            component={AdminCalendar}
          />
          <Stack.Screen
            name="AdminWorkerManagement"
            options={{
              title: t('adminWorkerManagement.title'),
            }}
            component={AdminWorkerManagement}
          />
          <Stack.Screen
            name="AdminWorkers"
            options={{
              title: t('adminWorkers.title'),
            }}
            component={AdminWorkers}
          />
          <Stack.Screen
            name="AdminWorkerDayOffs"
            options={{
              title: 'İzin günleri',
            }}
            component={AdminWorkerDayOffs}
          />
          <Stack.Screen
            name="AdminAddWorker"
            options={{
              title: t('addWorker.title'),
            }}
            component={AdminAddWorker}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
