import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBKc-dOZFiMOX8iHjbSCicrUrnCgMVgxew",
    authDomain: "prog3-reactnative-ti.firebaseapp.com",
    projectId: "prog3-reactnative-ti",
    storageBucket: "prog3-reactnative-ti.firebasestorage.app",
    messagingSenderId: "821208447149",
    appId: "1:821208447149:web:06cd776375d0e7ffa6ee24"
  };

  app.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();