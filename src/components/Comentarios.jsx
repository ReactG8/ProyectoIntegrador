import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const mySwal = withReactContent(Swal);

export const Comentarios = () => {
   
    const [comentarios, setComentarios] = useState([]);


    /*Carga los datos de conexion a la bd */
    const comentariosCollection = collection(db, "comentarios");
    console.log(comentariosCollection);





    /* Obtener los registros*/
    const getComentarios = async () => {
        try {
            const data = await getDocs(comentariosCollection);
            setComentarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

       
    };


    /*Funcion Delete*/

    const deleteComentario = async (id) => {

        const comentariosDoc = doc(db, "comentarios", id)
        await deleteDoc(comentariosDoc)
        await getComentarios();  // aca podes actualizar la tabla
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Seguro quiere borrarlo?',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,

            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar!!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteComentario(id)
                Swal.fire(
                    'Borrado!',
                    'El comentario fue borrado.',
                    'success' // es el icono de satisfactorio
                )
            }
        });
    };


    




    /*Funcion useEffect para actualizar*/
    useEffect(() => {
        getComentarios();
    }, []);


    return (

        // <div className="App">
        <div className="container">

            <div className="row">
                <div className="col">


                    {/*Tabla para mostrar los registros*/}
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Comentario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/*Mapeo de los registros*/}
                            {comentarios.map((coment) => (
                                <tr>
                                    <td>{coment.nombre}</td>
                                    <td>{coment.apellido}</td>
                                    <td>{coment.email}</td>
                                    <td>{coment.comentario}</td>
                                    <td>

                                        <button className="btn btn-danger" onClick={() => confirmDelete(coment.id)}><i className="fa-solid fa-trash"></i></button>
                                       
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        // </div>

    );

};