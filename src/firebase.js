// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgn9zbR_T08-n7drv95gmbL27Cgi97dbk",
  authDomain: "project-2-c70d6.firebaseapp.com",
  projectId: "project-2-c70d6",
  storageBucket: "project-2-c70d6.appspot.com",
  messagingSenderId: "337529972924",
  appId: "1:337529972924:web:88d06dba726fa05ad5c8b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;