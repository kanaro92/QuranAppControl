import React, {useContext} from 'react';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {View} from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import CustomIndicator from '../components/CustomIndicator';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNav;
