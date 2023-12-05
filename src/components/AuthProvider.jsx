import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, userExists } from "../firebaseConfig/firebase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export function AuthProvider ({
    children, 
    onUserLoggedIn, 
    onUserNotLoggedIn,
    onUserNotRegistered}) {
    
    const navigate = useNavigate;

    useEffect(() => {
    
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid)
    
                if(isRegistered){ 
                  onUserLoggedIn(user);
                }else{
                    onUserNotRegistered(user);
                }
                console.log(`Bienvenido ${user.displayName}`);
            } else {
                onUserNotLoggedIn();
            }
        })
    }, [navigate]);
    
    return <div>{children}</div>;
    
}