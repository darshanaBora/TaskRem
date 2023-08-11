import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Arrow,
  Platform,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import db from '../config';
import { Input } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function AddTask({ navigation }) {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('00');
  const [minDate, setMinDate] = useState('');
  const [min, setMin] = useState('00');
  const hourOptions = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];
  const minuteOptions = [
    '00',
    '05',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ];
  const [triggerTS, setTriggerTS] = useState('');

  const trigger = new Date(triggerTS);

  trigger.setHours(hour);
  trigger.setMinutes(min);
  trigger.setSeconds(0);

  async function submitButton() {
    if (date && task) {
      await db.collection(firebase.auth().currentUser.email).add({
        date: date,
        task: task,
        hour: hour,
        min: min,
        //taskType: 'personal',
      });
      // this.setState({ task: '', date: '', time: '' });
      Alert.alert('Task Added');
      setTask(null);
      setHour(null);
      setMin(null);
    } else {
      // this.setState({ task: '', date: '', time: '' });
      Alert.alert('Please fill in all the fields including selecting a date');
    }
  }

  async function sendPushNotification() {
    if (task != '') {
      alert('check')
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'TaskRem',
          body: task,
          data: {},
        },

        trigger,
      });

      //  await Notifications.cancelScheduledNotificationAsync(identifier);
      Alert.alert('You have successfully subscribed for notifications');
      // alert('You have successfully subscribed for notifications');
    } else {
      alert('Please give the Task description');
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#8edff5',
      }}>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={{ margin: 5 }}
          onPress={() => navigation.navigate('Home')}>
          <AntDesign name="leftcircleo" size={35} color="#311389" />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: RFValue(30),
            color: '#311389',
          }}>
          Create Task
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={{
            borderWidth: RFValue(1),
            padding: RFValue(10),
            borderRadius: RFValue(10),
            margin: RFValue(5),
          }}
          placeholder={'Tasks'}
          multiline={true}
          onChangeText={(text) => {
            setTask(text);
          }}
          value={task}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ padding: RFValue(10), fontSize: 18, color: '#311389' }}>
          Hour-
        </Text>
        <Picker
          selectedValue={hour}
          onValueChange={(itemValue) => setHour(itemValue)}
          style={{ width: 100 }}>
          {hourOptions.map((hour) => (
            <Picker.Item key={hour} label={hour} value={hour} />
          ))}
        </Picker>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ padding: RFValue(10), fontSize: 18, color: '#311389' }}>
          Minute-
        </Text>
        <Picker
          selectedValue={min}
          onValueChange={(itemValue) => setMin(itemValue)}
          style={{ width: 100 }}>
          {minuteOptions.map((minute) => (
            <Picker.Item key={minute} label={minute} value={minute} />
          ))}
        </Picker>
      </View>
      <View style={{ marginTop: 10 }}>
        <Calendar
          onDayPress={(day) => {
            console.log('Calender date' + day.timestamp);
            setTriggerTS(day.timestamp);
            setDate(day.dateString);
            Alert.alert('Date Selected');
            // setTriggerDay(day.day);
            //setTriggerMonth(day.month);
          }}
          style={{}}
          theme={{
            backgroundColor: 'white',
            calendarBackground: 'white',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#311389',
            selectedDayTextColor: 'white',
            todayTextColor: 'cyan',
            dayTextColor: 'black',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#311389',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#311389',
            indicatorColor: 'black',
            textDayFontWeight: '300',
            textMonthFontWeight: '5',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          minDate={minDate}
        />
      </View>
      <TouchableOpacity
        onPress={async () => {
          await sendPushNotification();
        }}
        style={{ alignSelf: 'flex-end' }}>
        <Text
          style={{
            margin: 15,
            marginTop: RFValue(3),
            marginRight: RFValue(10),
            color: '#234152',
            fontWeight: 'bold',
          }}>
          Need to be Notified? Click here
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={submitButton}>
          <Text style={styles.textStyle}> Submit </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: screenHeight / 70,
    fontSize: RFValue(20),
    borderRadius: RFValue(20),
    padding: RFValue(10),
    paddingHorizontal: RFValue(90),
    backgroundColor: '#311389',
  },
  textStyle: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 30,
  },
});
