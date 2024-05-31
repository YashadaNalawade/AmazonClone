import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADuya8u1jWeNYKANU6koUhw9evdB_nsmA",
    authDomain: "clone-9cf65.firebaseapp.com",
    projectId: "clone-9cf65",
    storageBucket: "clone-9cf65.appspot.com",
    messagingSenderId: "398663995464",
    appId: "1:398663995464:web:f8706fb92c35601c7b487d",
    measurementId: "G-YJ74E88PWX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};
