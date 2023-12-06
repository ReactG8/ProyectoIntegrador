import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, getUserInfo, registerNewUser, userExists } from "../firebaseConfig/firebase.js";
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
                    const userInfo = await getUserInfo(user.uid);
                    if(userInfo.processComplete){
                        onUserLoggedIn(userInfo);
                    }else{
                        onUserNotRegistered(userInfo);
                    }
                }else{
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username: "",
                        processComplete: false
                    });
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