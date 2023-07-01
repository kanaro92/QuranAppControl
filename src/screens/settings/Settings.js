import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {AuthContext} from '../../context/AuthContext';

const Settings = ({navigation}) => {
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.danger,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    fontSize: 18,
    width: 130,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
