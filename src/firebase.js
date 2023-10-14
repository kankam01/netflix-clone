//import firebase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
//import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyCyvuJtIYRITJuhyn4Hm74skWiyKeXNsv8",
    authDomain: "netflix-clone-a13bf.firebaseapp.com",
    projectId: "netflix-clone-a13bf",
    storageBucket: "netflix-clone-a13bf.appspot.com",
    messagingSenderId: "617588135236",
    appId: "1:617588135236:web:3c6d1ec760310e7739f311"
  };

  const firebaseApp =   firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;

