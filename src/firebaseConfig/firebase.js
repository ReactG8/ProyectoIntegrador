// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG0yQ0rqE0TrYZCn2riQfUOJgHRRZPAq0",
  authDomain: "ferreteria-mibarrio.firebaseapp.com",
  projectId: "ferreteria-mibarrio",
  storageBucket: "ferreteria-mibarrio.appspot.com",
  messagingSenderId: "291884527308",
  appId: "1:291884527308:web:053453f2c1251f28ea1c69",
  measurementId: "G-GX4X2FLVLR"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)




