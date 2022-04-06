// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBiJ_WWQg6WgRpI_l0gaQLOc4CmtESZFNk",
  authDomain: "mystore-7857c.firebaseapp.com",
  projectId: "mystore-7857c",
  storageBucket: "mystore-7857c.appspot.com",
  messagingSenderId: "531527065495",
  appId: "1:531527065495:web:3fd4f4331e0a01ad45eed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const fireDB= getFirestore(app);
// const storage = getStorage(app);


export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);