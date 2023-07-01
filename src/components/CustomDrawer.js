import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions, Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS, IMGS} from '../constants';
import {AuthContext} from '../context/AuthContext';

const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const {userInfo} = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground source={IMGS.bgPattern} style={{height: 140}}>
        <Image source={IMGS.user} style={styles.userImg} />
      </ImageBackground>
      <View style={styles.userInfoStyle}>
        <Text>
          {userInfo ? userInfo.firstName : ''}{' '}
          {userInfo ? userInfo.lastName : ''}
        </Text>
      </View>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  drawerListWrapper: {
    marginTop: 10,
  },
  userInfoStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
});
