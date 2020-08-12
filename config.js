import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCG9wao50UScor3EbmJAfDA3TOP5hFms4k",
    authDomain: "survey-16864.firebaseapp.com",
    databaseURL: "https://survey-16864.firebaseio.com",
    projectId: "survey-16864",
    storageBucket: "survey-16864.appspot.com",
    messagingSenderId: "339777334001",
    appId: "1:339777334001:web:3220bb09dfea63150e9750"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
