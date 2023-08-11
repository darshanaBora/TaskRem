import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import db from '../config';
import {useState} from 'react';
import firebase from 'firebase';
import Visibility from './Visibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    Visibility();
  
  const handleRegister =()=>{
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("Welcome Back!")
    navigation.navigate("Home")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
  }
  return (
    <View>
      <View style={{ flex: 1, height: screenHeight, width: screenWidth }}>
        <Image source={require('../assets/LoginScreen.png')}></Image>
      </View>
      <View
        style={styles.inputContainer}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.emailText}>Email Id:</Text>
          <Input
            style={styles.inputEmail}
            onChangeText={(text) => setEmail(text)}
            placeholder={'Enter email'}
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.passText}>Password:</Text>
          <Input
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder={'Password'}
            placeholderTextColor={'grey'}
            secureTextEntry={passwordVisibility}
            value={password}
            enablesReturnKeyAutomatically
            rightIcon={
              <TouchableOpacity
                style={{
                  marginRight: 5,
                }}
                onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={22}
                  color="#232323"
                />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleRegister}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navForgotPass} 
        onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.textForg}>Forgot password?</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.navRegister} 
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.textReg}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: screenWidth-60,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: RFValue(30),
    padding: RFValue(10),
    marginTop: screenHeight/3,
  },
  input: {
    width: RFValue(10),
    height: RFValue(40),
    color: 'grey',
    borderWidth: RFValue(1),
    borderColor: 'cyan',
    borderRadius: RFValue(5),
    padding: 5
  },
  inputEmail: {
    width: RFValue(10),
    height: RFValue(40),
    color: 'grey',
    borderWidth: RFValue(1),
    borderColor: 'cyan',
    borderRadius: RFValue(5),
    padding: 5,
    marginLeft: 10
  },
  emailText:{
    fontSize: 15,
    textAlign: 'center',
    margintop: 10,
    fontWeight: 'bold',
    color: 'grey'
  },
  passText:{
    fontSize: 15,
    margintop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey'
  },
  loginButton: {
    height: 40,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'cyan',
    borderRadius: 130,
    marginLeft: 110,
  },
  loginText: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 25,
  },
  navForgotPass:{
    alignItems: 'center',
    marginTop: 15,
    fontWeight: 'bold'
  },
  navRegister:{
    alignItems: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  textForg: {
    fontWeight: 'bold',
    color: '#311389',
    fontSize: 15
  },
  textReg: {
    fontWeight: 'bold',
    color: '#311389',
    fontSize: 18
  }
})