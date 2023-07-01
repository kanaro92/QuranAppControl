import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants';
import ClientRegister from '../screens/home/ClientRegister';
import Home from '../screens/home/Home';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.HOME_TAB} component={Home} />
      <Stack.Screen name={ROUTES.CLIENT_REGISTER} component={ClientRegister} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
