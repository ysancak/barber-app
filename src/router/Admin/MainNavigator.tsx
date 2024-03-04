import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import {navigationRef} from '../root.navigation';

import {HeaderTitle} from '@/components';
import {Calendar, Dashboard, Login} from '@/pages/Admin';
import WorkerManagement from '@/pages/Admin/WorkerManagement';
import DayOffs from '@/pages/Admin/WorkerManagement/WorkerDayOffs';
import Workers from '@/pages/Admin/WorkerManagement/Workers';
import AddWorker from '@/pages/Admin/WorkerManagement/Workers/AddWorker';
import {colors} from '@/utils';

const Stack = createStackNavigator();

function AdminMainNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Dashboard"
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
          name="Login"
          options={{
            title: t('loginAndRegister.login'),
          }}
          component={Login}
        />
        <Stack.Screen
          name="Dashboard"
          options={{
            title: 'Yönetim',
            headerShown: false,
          }}
          component={Dashboard}
        />
        <Stack.Screen
          name="Calendar"
          options={{
            title: 'Takvim',
          }}
          component={Calendar}
        />
        <Stack.Screen
          name="WorkerManagement"
          options={{
            title: 'Çalışan Yönetimi',
          }}
          component={WorkerManagement}
        />
        <Stack.Screen
          name="Workers"
          options={{
            title: 'Çalışanlar',
          }}
          component={Workers}
        />
        <Stack.Screen
          name="DayOffs"
          options={{
            title: 'İzin günleri',
          }}
          component={DayOffs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AdminMainNavigator;
