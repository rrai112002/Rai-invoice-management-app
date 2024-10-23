// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA2Cv-dxZ-jpbog6uOy9yehyqAHGRqqf40",
  authDomain: "invoice-management-b52b4.firebaseapp.com",
  projectId: "invoice-management-b52b4",
  storageBucket: "invoice-management-b52b4.appspot.com",
  messagingSenderId: "514387782099",
  appId: "1:514387782099:web:244bd28258b7b02613e726",
  measurementId: "G-GVM4QEJLRL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

