import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Welcome({ navigation }) {
  return (
    <View style={{flex:1}}>
      <View style={{ flex: 1, height: screenHeight, width: screenWidth }}>
        <Image source={require('../assets/FlashSreen.png')}></Image>
      </View>
       <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   registerButton: {
    height: 40,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#311389',
    borderRadius: 130,
    marginLeft: 20,
    marginTop: 530,
  },
    registerText: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 25,
  },
  loginButton: {
    height: 40,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#311389',
    borderRadius: 130,
    marginLeft: 20,
    marginTop: 530,
  },
    loginText: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 25,
  }
})