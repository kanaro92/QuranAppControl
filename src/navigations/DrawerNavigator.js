import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import {Wallet, Notifications, Settings} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import {Text, TouchableOpacity, View} from 'react-native';
import Logout from '../screens/auth/Logout';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
        options={{
          title: 'Acueil',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />

      {/*<Drawer.Screen*/}
      {/*  name={ROUTES.WALLET_DRAWER}*/}
      {/*  component={Wallet}*/}
      {/*  options={{*/}
      {/*    title: 'Wallet',*/}
      {/*    drawerIcon: ({focused, color, size}) => (*/}
      {/*      <Icon name="wallet" size={18} color={color} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}

      <Drawer.Screen
        name={ROUTES.NOTIFICATIONS_DRAWER}
        component={Notifications}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="notifications" size={18} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.SETTINGS}
        component={Settings}
        options={{
          title: 'Paramètres',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="settings" size={18} color={color} />
          ),
        }}
      />
      {/*<Drawer.Screen*/}
      {/*  name={ROUTES.SETTINGS}*/}
      {/*  component={Logout}*/}
      {/*  options={{*/}
      {/*    title: 'Logout',*/}
      {/*    drawerIcon: ({focused, color, size}) => (*/}
      {/*      <Icon name="settings" size={18} color={color} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
