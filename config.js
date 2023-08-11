import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAvCwXogLBZLJDXM2QwRWXkdWai1fZkiz4",
  authDomain: "taskrem-fc1a9.firebaseapp.com",
  projectId: "taskrem-fc1a9",
  storageBucket: "taskrem-fc1a9.appspot.com",
  messagingSenderId: "508440119540",
  appId: "1:508440119540:web:67e7c445e37f083f44f6a1"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
export default db