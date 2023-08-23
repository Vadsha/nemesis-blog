import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB3qXqWUw-kEux1QpnXlDPv5_l1fySeHVc",
  authDomain: "nemesis-301cb.firebaseapp.com",
  projectId: "nemesis-301cb",
  storageBucket: "nemesis-301cb.appspot.com",
  messagingSenderId: "688397756839",
  appId: "1:688397756839:web:a493ebb0d4ad778453ae82"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
