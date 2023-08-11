import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default function Loading({navigation}){
  function UserLoggedIn(){
    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      navigation.navigate('Home')
    var uid = user.uid;
    // ...
  } else {
      navigation.navigate('Welcome')
  }
});
  }
  return(
    <View>
    </View>
  );
}