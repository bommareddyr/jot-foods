// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLf6yEowqcBv8deA3sF6DqU8pkHA-ObME",
  authDomain: "joy-of-telugu.firebaseapp.com",
  projectId: "joy-of-telugu",
  storageBucket: "joy-of-telugu.appspot.com",
  messagingSenderId: "83802241709",
  appId: "1:83802241709:web:51b8ffbcdc25b13da9e424"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Intialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
export default firebaseApp;