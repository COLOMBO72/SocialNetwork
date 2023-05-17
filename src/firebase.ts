import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: 'https://socialnetworkcolombo-default-rtdb.firebaseio.com'
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const createUser = async (email:string, password:string) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email:string, password:string) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}


