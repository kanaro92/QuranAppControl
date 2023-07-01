import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants';

const NotificationsDetail = ({navigation, route}) => {
  const data = route.params;
  console.log('data: ' + data.id);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Text selectable style={styles.items}>Nom: {data.name}</Text>
        <Text selectable style={styles.items}>
          Phone: {data.phone}
        </Text>
        <Text selectable style={styles.items}>
          Code: {data.code.code}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotificationsDetail;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 8,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  items: {
    color: COLORS.black,
    fontSize: 20,
  },
});
