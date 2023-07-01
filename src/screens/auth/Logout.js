import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

const Logout = props => {
  const {logout} = useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={() => {
        logout();
      }}
    />
  );
};

export default Logout;
