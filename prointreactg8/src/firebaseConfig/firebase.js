// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs } from "@firebase/firestore"
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIRABASE_API_KEY,
  authDomain: "ferreteria-mibarrio.firebaseapp.com",
  projectId: "ferreteria-mibarrio",
  storageBucket: "ferreteria-mibarrio.appspot.com",
  messagingSenderId: "291884527308",
  appId: "1:291884527308:web:053453f2c1251f28ea1c69",
  measurementId: "G-GX4X2FLVLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


// configuracion de autenticacion - login

export const auth = getAuth(app);

export async function userExists(uid){
  const docRef = doc(db, 'users', uid);
  const res = await getDoc(docRef);
  return res.exists();
}

export async function existsUsername(username) {
  const users = [];
  const docRef = collection(db, "users")
  const q = query(docRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}
