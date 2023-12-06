import { useNavigate, Link } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";
import { useState } from "react";
import { existsUsername, updateUser } from "../firebaseConfig/firebase.js";
import "./ChooseUsername.css"

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
        if(username !== ""){
            const exists = await existsUsername(username);
            if(exists){
                setState(5);
            }else{
                const tmp = {... currentUser};
                tmp.username = username;
                tmp.processComplete = true;
                await updateUser(tmp);
                setState(6);
            }
        }
    }

    if(state === 3 || state === 5){
        return (
            <div >
                <h1>
                    Bienvenido {currentUser.displayName}
                </h1>
                <p>
                    Para terminar el registro, elige un nombre de usuario
                </p>
                {state === 5? <p>EL nombre de usuario ya existe, por favor esoge otro</p> : ""}
                <div className="container-input">
                    <input type="text" onChange={handleInputUsername}/>
                </div>
                <div className="container-btn">
                    <button className="btn-continuar" onClick={handleContinue}>Continuar</button>
                </div>
            </div>)
    }

    if(state === 6){
        return <div>
            <h1>Usuario creado con éxito! ya puedes administrar nuestro stock</h1>
            <div className="container-btn">
                <Link to="/admin" className="btn-continuar">Continuar</Link>
            </div>
        </div>
    }else{

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