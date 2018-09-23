import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA5MqkWXbHiYivtsCJtIhifhaKA25NzSrY",
  authDomain: "massdrop-shopping.firebaseapp.com",
  databaseURL: "https://massdrop-shopping.firebaseio.com",
  projectId: "massdrop-shopping",
  storageBucket: "massdrop-shopping.appspot.com",
  messagingSenderId: "239003387304"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
