import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [authError, setAuthError] = useState(null);

  const login = async (username, password) => {
    setAuthError('');
    setIsLoading(true);
    await axios
      .post(`${BASE_URL}/token`, {
        username,
        password,
      })
      .then(res => {
        console.log('resp: ' + res.data.token);
        console.log('data.firstName: ' + res.data.firstName);
        setUserToken(res.data.token);
        setUserInfo(res.data);
        console.log('userInfo.firstName: ' + userInfo.firstName);
        AsyncStorage.setItem('userToken', res.data.token);
        AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
      })
      .catch(e => {
        console.log('error: ' + e.response.status);
        if (e.response.status === 401) {
          //Bad Credentials
          setAuthError('Erreur: Vérifiez votre login ou mot de passse!');
        }
      })
      .finally(setIsLoading(false));
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let info = await AsyncStorage.getItem('userInfo');
      let token = await AsyncStorage.getItem('userToken');
      info = JSON.parse(info);
      if (info) {
        console.log('token: ' + token);
        setUserToken(token);
        setUserInfo(info);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, userInfo, authError}}>
      {children}
    </AuthContext.Provider>
  );
};
