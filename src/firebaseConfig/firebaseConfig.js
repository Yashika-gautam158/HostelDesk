// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKe8Cao5sk1b7SLx7Ea7ldAD9I_WhDZPA",
  authDomain: "hostelmanagement-f084c.firebaseapp.com",
  projectId: "hostelmanagement-f084c",
  storageBucket: "hostelmanagement-f084c.firebasestorage.app",
  messagingSenderId: "611394902689",
  appId: "1:611394902689:web:5382cbbb1a0971dbf86ee0",
  measurementId: "G-EJ8PTJZ6YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db =   getFirestore(app);
 export const auth = getAuth(app);