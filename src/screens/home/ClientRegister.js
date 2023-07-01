import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS, ROUTES} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {BASE_URL} from '../../config';
import {AuthContext} from '../../context/AuthContext';
import CustomIndicator from '../../components/CustomIndicator';

const ClientRegister = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState(null);
  const [savingError, setSavingError] = useState(null);

  const {userInfo} = useContext(AuthContext);
  const {userToken} = useContext(AuthContext);

  function resetForm() {
    setName('');
    setPhone('');
    setCountry('');
    setSavingError('');
  }

  const saveInfos = async () => {
    // if (userInfo.username == 'abousy') {
    // }
    if (!name || !phone || !country) {
      setSavingError('Veuillez remplir tous les champs!');
      return;
    }
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/ventes`,
        {
          name: name,
          phone: phone,
          country: country,
          cfaPrice: 5000,
          createdBy: {
            id: userInfo.id,
          },
        },
        {
          timeout: 60000, // Set a timeout of 60 seconds
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then(res => {
        console.log('resp: ' + res.data.name);
        setIsLoading(false);
        resetForm();
        navigation.navigate(ROUTES.NOTIFICATIONS_DETAIL, res.data);
      })
      .catch(e => {
        console.log('error: ' + e);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.wFull}>
        <Text style={styles.loginContinueTxt}>Remplir les infos</Text>
        <Text style={styles.savingError}>{savingError}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom & Prenom"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Numero de telephone"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pays"
          value={country}
          onChangeText={text => setCountry(text)}
        />
        {isLoading ? (
          <CustomIndicator />
        ) : (
          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => saveInfos()}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Enregistrer</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
      <View style={styles.container} />
    </SafeAreaView>
  );
};

export default ClientRegister;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    alignItems: 'center',
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '50%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  // utils
  wFull: {
    width: '100%',
  },
  savingError: {
    textAlign: 'center',
    color: COLORS.danger,
  },
});
