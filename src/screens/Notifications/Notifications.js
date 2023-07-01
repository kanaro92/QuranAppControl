import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {BASE_URL} from '../../config';
import {AuthContext} from '../../context/AuthContext';
import CustomIndicator from '../../components/CustomIndicator';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import filter from 'lodash.filter';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const Notifications = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {userInfo} = useContext(AuthContext);
  const {userToken} = useContext(AuthContext);
  const {logout} = useContext(AuthContext);

  const getNotifications = async () => {
    try {
      setIsLoading(true);
      //getNotifs from backend
      await axios
        .get(`${BASE_URL}/ventes/byCreatedBy/${userInfo.id}`, {
          timeout: 20000, // Set a timeout of 20 seconds
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          //res.data.forEach(value =>  console.log('respd: ' + value.id));
          setData(res.data);
          setFullData(res.data);
          console.log('Status code: ' + res.status);
        })
        .catch(e => {
          console.log('Error: ' + e);
          console.log('Status code: ' + e.response.status);
          if (e.response.status === 401) {
            //logout
            logout();
          }
        });
    } catch (e) {
      console.log(`error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, []),
  );
  function goToDetail(item) {
    navigation.navigate(ROUTES.NOTIFICATIONS_DETAIL, item);
  }

  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 10}}>
        <Text>ID: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Phone: {item.phone}</Text>
        {/* Render other properties as needed */}
      </View>
    );
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, vente => {
      return contains(vente, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({name, phone, code}, query) => {
    return !!(
      name.toLowerCase().includes(query) ||
      phone.includes(query) ||
      code.code.toString().includes(query)
    );
  };

  return (
    <View>
      <View style={styles.main}>
        {/*<Text style={styles.listTitle}>Clients</Text>*/}
        <TouchableOpacity
          onPress={() => getNotifications()}
          activeOpacity={0.7}
          style={styles.loginBtn}>
          {/*<Icon name="rocket" size={30} color="#900" />*/}
          <Icon name="reload" size={25} color="#A376F1" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={searchQuery}
        placeholder="Rechercher"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={query => handleSearch(query)}
        style={styles.inputSearch}
      />

      {isLoading ? (
        <CustomIndicator />
      ) : (
        <View style={styles.listView}>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getNotifications}
              />
            }
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => goToDetail(item)}>
                <View style={styles.item}>
                  <Text style={styles.title}>{item.name}</Text>
                  <View style={styles.phone}>
                    <Text style={styles.subTitle}>{item.phone}</Text>
                    <Icon name="call" size={18} color="#A376F1" />
                  </View>
                  <View style={styles.phone}>
                    <Text style={styles.subTitle}>{item.code.code}</Text>
                    <Icon name="card" size={18} color="#A376F1" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 2,
    marginVertical: 3,
    marginHorizontal: 5,
    borderColor: '#CCC',
    borderRadius: 10,
  },
  main: {
    alignItems: 'center',
    marginVertical: 1,
    marginHorizontal: 2,
  },
  listView: {
    paddingBottom: 172,
  },
  listTitle: {
    color: COLORS.black,
    fontSize: 18,
  },
  title: {
    color: COLORS.black,
    fontSize: 20,
  },
  subTitle: {
    fontSize: 18,
  },
  phone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSearch: {
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    paddingVertical: 5,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
  },
});
