import { Text, View, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Screens/Welcome';
import Register from './Screens/Register';
import Login from './Screens/Login';
import Loading from './Screens/Loading';
import Home from './Screens/Home';
import ForgotPass from './Screens/ForgotPass';
import AddTask from './Screens/AddTask';

const Stack = createStackNavigator();

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddTask" component={AddTask} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

