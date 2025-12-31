// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuVT82TFaWfbgrt1iUkAVq7Ctfca6TL90",
  authDomain: "netflixgpt-9fc36.firebaseapp.com",
  projectId: "netflixgpt-9fc36",
  storageBucket: "netflixgpt-9fc36.firebasestorage.app",
  messagingSenderId: "217245214442",
  appId: "1:217245214442:web:a04c560fc95a8b911c5993",
  measurementId: "G-5D6E15RWPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
