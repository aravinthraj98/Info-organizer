import React from "react";

import firebase from "firebase/compat/app"


const firebaseConfig = {
  apiKey: 'AIzaSyAToS4hh6JYrOHJ2yxECFv72Rj9YqCvqqM',
  authDomain: 'infoorganizer-2c5ca.firebaseapp.com',
  projectId: 'infoorganizer-2c5ca',
  storageBucket: 'infoorganizer-2c5ca.appspot.com',
  messagingSenderId: '243621485364',
  appId: '1:243621485364:web:6fd74a1f47215492116361',
  measurementId: 'G-XD9ZP8LR5G',
};
firebase.initializeApp(firebaseConfig);

export default firebase;