import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {navigationRef} from './root.navigation';

import {HeaderTitle} from '@/components';
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
  ReservationUserInfo,
  SaloonDetail,
  SelectInputDetail,
  Settings,
  ShoppingCart,
} from '@/pages';
import TabNavigator from '@/router/TabNavigator';
import {colors} from '@/utils';

const Stack = createStackNavigator();

function MainNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <NavigationContainer ref={navigationRef}>
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
        })}>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
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
          options={{title: 'Sepet'}}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{title: 'Rezervasyonu planlayın'}}
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
          name="ReservationUserInfo"
          component={ReservationUserInfo}
          options={{title: 'Bilgilerinizi kontrol edin'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
