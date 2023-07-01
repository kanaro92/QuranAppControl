import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import {useNavigation} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import NotificationsNavigator from './NotificationsNavigator';
import {AuthContext} from '../context/AuthContext';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();
  const {userInfo} = useContext(AuthContext);

  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        //tabBarShowLabel: false,
        // tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === ROUTES.WALLET) {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused
              ? 'md-notifications-sharp'
              : 'md-notifications-outline';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}>
      {/*<Tab.Screen*/}
      {/*  name={ROUTES.WALLET}*/}
      {/*  component={Wallet}*/}
      {/*  options={{*/}
      {/*    tabBarButton: props => <CustomTabBarButton {...props} />,*/}
      {/*  }}*/}
      {/*/>*/}
      <Tab.Screen
        name={ROUTES.NOTIFICATIONS_NAVIGATOR}
        component={NotificationsNavigator}
        options={{
          headerShown: true,
          //headerTitle: userInfo.firstName.concat(' ').concat(userInfo.lastName),
          headerTitle: 'Quran',
          tabBarButton: props => (
            <CustomTabBarButton route="notifications" {...props} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                  size={30}
                  color={COLORS.dark}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeNavigator}
        options={{
          headerShown: true,
          // headerTitle: userInfo.firstName.concat(' ').concat(userInfo.lastName),
          headerTitle: 'Quran',
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                  size={30}
                  color={COLORS.dark}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Paramètres',
          // headerTitle: userInfo.firstName.concat(' ').concat(userInfo.lastName),
          headerTitle: 'Quran',
          headerShown: true,
          tabBarButton: props => (
            <CustomTabBarButton route="settings" {...props} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                  size={30}
                  color={COLORS.dark}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 2,
    height: 60,
  },
});
