import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, userExists } from "../firebaseConfig/firebase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";

export function Login() {

    const navigate = useNavigate();

    //const[currentUser, setCurrentUser] = useState(null);

    /*
    0: Inicializando
    1: Loading
    2: Login Completo
    3: Login sin regristrar
    4: No hay un usuario logueado
    5: Ya exister el username
    */

    const[state, setCurrentState] = useState(0);

    /*
    useEffect(() => {
        
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid)
    
                if(isRegistered){ 
                    setCurrentState(2); //Redirige al Dashboard
                    navigate("/admin")
                }else{
                    setCurrentState(3); //Redirige a seleccionar username
                    navigate("")
                }
                console.log(`Bienvenido ${user.displayName}`);
            } else {
                setCurrentState(4);
                console.log("No hay nadie autenticado... ");
            }
        })
    }, [navigate]);

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
        console.log(`Bienvenido ${user.displayName}`);
    };

    function handleUserNotRegistered(user) {
        navigate("")  //Redirige a seleccionar username
    };

    function handleUserNotLoggedIn() {
        setCurrentState(4);
    };
 
    /*
    if(state === 2){
        return <div>Estas autenticado y registrado</div>
    }

    if(state === 3){
        return <div>Estas autenticado pero no registrado...</div>
    }
    */

    if(state === 4){
        return (
            <div>
                <button onClick={handleOnClick}>
                    Login con Google
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