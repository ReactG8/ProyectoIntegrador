import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig/firebase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";
import "./Login.css"

export function Login() {

    const navigate = useNavigate();

    const[state, setCurrentState] = useState(0);

    /*
    0: Inicializando
    1: Loading
    2: Login Completo
    3: Login sin regristrar
    4: No hay un usuario logueado
    5: Ya exister el username
    6: Nuevo username,click para continuar
    */

    async function handleOnClick() {
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);

        async function signInWithGoogle(googleProvider) {
            try {
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function handleUserLoggedIn(user) {
        navigate('/admin')   //Redirige al CRUD
    };

    function handleUserNotRegistered(user) {
        navigate("/choose-username")  //Redirige a seleccionar username
    };

    function handleUserNotLoggedIn() {
        setCurrentState(4);
    };
 
    if(state === 4){
        return (
            <div>
                <button className="login-button" onClick={handleOnClick}>
                <i className="fab fa-google"></i> Login con Google
                </button>
            </div>
        )
    }

    if(state === 5){
        return (
            <div>
                <button className="login-button" onClick={handleOnClick}>
                <i className="fab fa-google"></i>  Login con Google
                </button>
            </div>
        )
    }

    return (
        <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}>
                <div>Loading...</div>
        </AuthProvider>
    );

}