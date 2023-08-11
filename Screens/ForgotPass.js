import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function ForgotPass({ navigation }) {
  const [email, setEmail] = useState('');

  const sendEmail = () => {
    firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
     alert("Email sent!")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
     alert(errorMessage)
  });
  };
  return (
    <View style={{ flex: 1, height: screenHeight, width: screenWidth }}>
      <ImageBackground 
        style={{height: screenHeight, width: screenWidth}}
        source={require('../assets/ForgotPassScreen.png')}>
      <View>
        <TouchableOpacity
          style={{margin: 5}}
          onPress={()=> navigation.navigate('Login')}>
          <AntDesign name="leftcircleo" size={35} color="#311389" />
        </TouchableOpacity>
        <TextInput
          style={styles.email}
          onChangeText={(text) => setEmail(text)}
          placeholder={'Enter email'}
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity style={styles.button} onPress={ sendEmail}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'cyan',
    borderRadius: 130,
    marginLeft: 110,
    marginTop: 50,
  },
  buttonText: {
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
    justifyContent: 'center',
    fontSize: 25,
  },
  email: {
    height: 50,
    width: '60%',
    borderColor: 'cyan',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginLeft: 80,
    fontFamily: 'Bubblegum-Sans',
    fontSize: 15,
    backgroundColor: 'white',
    marginTop: 300
  },
});
