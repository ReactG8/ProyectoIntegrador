import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/Logo2.png"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase.js";
import './Contact.css'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const Contact = () => {
    // Use State
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [error, setMensaje] = useState('Por favor, dejenos su comentario');
    const [comentario, setComentario] = useState('');

    const comentarioCollection = collection(db, "comentarios")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que los campos no estén vacíos
        if (!nombre || !apellido || !email || !comentario) {
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        // Verificar el correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMensaje('Ingrese un correo electrónico válido');
            return;
        }

        // Enviar datos a Firestore
        try {


            await addDoc(comentarioCollection, {
                nombre,
                apellido,
                email,
                comentario
            });
            setMensaje('');

            // Limpia el formulario después de enviar y mensaje de confirmación
            setNombre('');
            setApellido('');
            setEmail('');
            setComentario('');
            console.log('Datos enviados correctamente a Firestore');
            setMensaje('Comentario enviado satisfactoriamente');
        } catch (error) {
            console.error('Error al enviar datos a Firestore', error);
            setMensaje('Error al enviar datos, por favor inténtelo de nuevo');
        }

        Swal.fire({
            icon: "success",
            title: "¡Mensaje enviado!",
            showConfirmButton: false,
            timer: 1500,
          });

    };


    return (
    <div className="App contactContainer">
            {/* //Desde aqui el formulario */}
            <div className="row align-items-center margin-navbar">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="d-grid gap">
                            <h2 className="h3 text-center">Dejanos tu comentario</h2>


                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-1">


                                <input className="form-control form-control-lg" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />



                                <input className="form-control form-control-lg" type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />



                                <input className="form-control form-control-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />


                                <textarea className="form-control form-control-lg" type="text" placeholder="Comentario:" rows="10" value={comentario} onChange={(e) => setComentario(e.target.value)} />

                                <div className="form-control form-control-lg">
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </div>
                                {error && <p style={{ color: 'black' }}>{error}</p>}
                            </form>
                        </div>

                        <div className="col"></div>

                    </div>
                </div>
            </div>

        </div>)
}