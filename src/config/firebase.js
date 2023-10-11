import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJd8peX18S5VW6jJyGxJhvLkjd2xjzFiI",
  authDomain: "learn-react-93a45.firebaseapp.com",
  projectId: "learn-react-93a45",
  storageBucket: "learn-react-93a45.appspot.com",
  messagingSenderId: "175113429419",
  appId: "1:175113429419:web:4472585cfc23a3d14bb2ee",
  measurementId: "G-TT2DM25RS1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage =  getStorage(app);