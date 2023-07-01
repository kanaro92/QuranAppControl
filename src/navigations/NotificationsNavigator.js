import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants';
import Notifications from '../screens/Notifications/Notifications';
import NotificationsDetail from '../screens/Notifications/NotificationsDetail';

const Stack = createStackNavigator();

function NotificationsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
      <Stack.Screen
        name={ROUTES.NOTIFICATIONS_DETAIL}
        component={NotificationsDetail}
      />
    </Stack.Navigator>
  );
}

export default NotificationsNavigator;
