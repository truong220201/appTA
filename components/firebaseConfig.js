import { initializeApp } from "firebase/app";
import { auth } from "firebase/app";
//var firebase = require('firebase')
//import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAQKLnnL3KBMmkG1m1hyiwbIUulLVwCzpE",
  authDomain: "my-eng-eca4e.firebaseapp.com",
  databaseURL: "https://my-eng-eca4e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-eng-eca4e",
  storageBucket: "my-eng-eca4e.appspot.com",
  messagingSenderId: "142903269026",
  appId: "1:142903269026:web:cf5490ec4709685f3ba9fb",
  measurementId: "G-NBBJTPEWHN"
}

export const firebaseApp = initializeApp(firebaseConfig);
