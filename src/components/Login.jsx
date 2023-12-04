import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, userExists } from "../firebaseConfig/firebase.js";
import { useEffect, useState } from "react";

export function Login() {

    const[currentUser, setCurrentUser] = useState(null);

    /*
    0: Inicializando
    1: Loading
    2: Login Completo
    3: Login sin regristrar
    4: No hay un usuario logueado
    */

    const[state, setCurrentState] = useState(0);

    useEffect(() => {
        setCurrentState(1);
        onAuthStateChanged(auth, handleUserStateChanged)
    }, []);

    

    async function handleUserStateChanged(user) {
        if (user) {
            const isRegistered = await userExists(user.uid)
            if(isRegistered){
                setCurrentState(2);
            }else{
                setCurrentState(3);
            }
            console.log(`Bienvenido ${user.displayName}`);
        } else {
            setCurrentState(4);
            console.log("No hay nadie autenticado... ");
        }
    }

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

    if(state === 2){
        return <div>Estas autenticado y registrado</div>
    }

    if(state === 3){
        return <div>Estas autenticado pero no registrado...</div>
    }

    if(state === 4){
        return (
            <div>
                <button onClick={handleOnClick}>
                    Login con Google
                </button>
            </div>
        )
    }

    return <div>Loadig...</div>

}