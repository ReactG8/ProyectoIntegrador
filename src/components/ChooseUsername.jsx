import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";
import { useState } from "react";
import { existsUsername } from "../firebaseConfig/firebase.js";

export function ChooseUsernameView() {

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [username, setUsername] = useState ("");

    function handleUserLoggedIn(user) {
        navigate('/admin')   //Redirige al CRUD
    };

    function handleUserNotRegistered(user) {
        setCurrentUser(user);
        setState(3);
    };

    function handleUserNotLoggedIn() {
        navigate("/login")
    };

    function handleInputUsername(e) {
        setUsername(e.target.value);
    }

    async function handleContinue() {
        if(username != ""){
            const exists = await existsUsername(username);
            if(exists){
                setState(5);
            }else{

            }
        }
    }

    if(state === 3){
        return (
            <div>
                <h1>
                    Bienvenido {currentUser.displayName}
                </h1>
                <p>
                    Para terminar el registro, elige un nombre de usuario
                </p>

                <div>
                    <input type="text" onChange={handleInputUsername}/>
                </div>
                <div>
                    <button onClick={handleContinue}>Continuar</button>
                </div>
            </div>)
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