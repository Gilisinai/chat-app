import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"


var firebaseConfig = {
    apiKey: "AIzaSyDPb7dEWZ5iRfyEfaFkCQG4c1_HvgKzIns",
    authDomain: "gili-chat.firebaseapp.com",
    databaseURL: "https://gili-chat.firebaseio.com",
    projectId: "gili-chat",
    storageBucket: "gili-chat.appspot.com",
    messagingSenderId: "181110658140",
    appId: "1:181110658140:web:419e6ab6ae1086c4b74299",
    measurementId: "G-KCNR06MGX2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase