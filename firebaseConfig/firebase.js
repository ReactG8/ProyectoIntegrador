import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIRABASE_API_KEY,
  authDomain: "ferreteria-mibarrio.firebaseapp.com",
  projectId: "ferreteria-mibarrio",
  storageBucket: "ferreteria-mibarrio.appspot.com",
  messagingSenderId: "291884527308",
  appId: "1:291884527308:web:053453f2c1251f28ea1c69",
  measurementId: "G-GX4X2FLVLR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
