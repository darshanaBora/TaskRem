import {
  View,
  ImageBackground,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useState, useEffect } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTask from './AddTask';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [tasks, setTasks] = useState([]);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert('You are successfully logged out.');
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        Alert.alert('Something went wrong. Could you please try again later.');
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    db.collection(firebase.auth().currentUser.email).onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();
        task.id = doc.id;
        allT.push(task);
      });
      setTasks(allT);
    });
  };

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteTask(postId),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteTask = async (id) => {
    await db
      .collection(firebase.auth().currentUser.email)
      .doc(id)
      .delete()
      .then(() => {
        alert('Task successfully deleted!');
      })
      .catch((error) => {
        alert('Something went wrong!Try later');
      });
    getTasks();
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#311389',
          width: '90%',
          marginLeft: 20,
          marginRight: 13,
          borderRadius: 20,
          flex: 1,
          margin: 5,
        }}>
        <View
          style={{
            backgroundColor: '#7851e8',
            borderRadius: 20,
            marginLeft: 10,
            padding: 10,
            width: '95%',
            marginTop: 10,
          }}>
          <ScrollView>
            <Text
              style={{
                fontSize: RFValue(15),
                marginLeft: RFValue(5),
                color: 'white',
              }}>
              Date : {item.date}
            </Text>
            <Text
              style={{
                fontSize: RFValue(15),
                marginLeft: RFValue(5),
                color: 'white'
              }}>
              Time : {item.hour}:{item.min}{' '}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: RFValue(23),
                color: 'white',
              }}>
              {item.task}
            </Text>
            <Pressable
              style={{ alignSelf: 'flex-end', marginRight: 10 }}
              onPress={() => handleDelete(item.id)}>
              <MaterialCommunityIcons
                name="delete-empty"
                size={22}
                color="white"
              />
            </Pressable>
          </ScrollView>
        </View>
      </View>
    );
  };

  const emptylist = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#311389',
          }}>
          {' '}
          No tasks at the moment
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, height: screenHeight, width: screenWidth }}>
      <ImageBackground
        style={{ width: screenWidth, height: screenHeight }}
        source={require('../assets/HomeScreen.png')}>
        <SafeAreaView style={styles.droidSafeArea} />
        <Text style={styles.text}>Hello!</Text>
        <TouchableOpacity onPress={logout} style={styles.logOutButton}>
          <AntDesign name="logout" size={24} color="white" />
        </TouchableOpacity>
        <CalendarStrip
          daySelectionAnimation={{
            type: 'border',
            duration: 100,
            borderWidth: 4,
            borderHighlightColor: '#311389',
          }}
          style={{
            height: '20%',
            fontSize: 50,
          }}
          calendarHeaderStyle={{
            color: '#311389',
            fontSize: 18,
            marginTop: 20,
          }}
          dateNumberStyle={{ color: '#311389' }}
          dateNameStyle={{ color: '#311389' }}
          highlightDateNumberStyle={{ color: '##0d2e63' }}
          highlightDateNameStyle={{ color: '##0d2e63' }}
          selectedDate={moment()}
          scrollable={true}
          iconContainer={{ flex: 0.1 }}
        />
        <FlatList
          ListEmptyComponent={emptylist}
          scrollEnabled={true}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{
            marginBottom: 20,
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTask')}
          style={styles.floatingButton}>
          <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS == 'android' ? StatusBar.setHidden(true) : RFValue(0),
  },
  text: {
    fontSize: 35,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#311389',
  },
  logOutButton: {
    marginRight: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#311389',
    borderRadius: 100,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginTop: 5,
  },
  floatingButton: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 150,
    backgroundColor: '#311389',
    borderRadius: 30,
    marginBottom: 20,
  },
});
