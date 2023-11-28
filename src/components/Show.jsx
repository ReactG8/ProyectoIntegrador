import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig/firebase"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const mySwal = withReactContent(Swal)
import logo from "../assets/Logo2.png"

export const Show = () => {
    const [productos, setProductos] = useState([])
    const productosCollection = collection(db, "productos")
    const getProductos = async () => {
        const data = await getDocs(productosCollection)
        setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const deleteFerreArt = async () => {
        const productosDoc = doc(db, "productos", id)
        await deleteDoc(productosDoc)
    }
    const confirmDelete = (id) => {
        Swal.fire({
            title: "¿Está seguro?",
            text: "¡No se podrá revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡quiero eliminarlo!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFerreArt(id);
                Swal.fire("¡Borrado!", "El documento ha sido eliminado.", "success");
            }
        });
    }
    useEffect(() => {
        getProductos()
    }, [])
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <a className="navbar-brand" href="/"><img src={logo} alt="Logo" width="50" height="50" className="d-inline-block"/> Ferretería</a>
                            <li className="nav-link disabled">
                                <Link className="nav-link" to={'/sign-in'}>
                                    Ingreso
                                </Link>
                            </li>
                            <li className="nav-link disabled">
                                <Link className="nav-link" to={'/sign-up'}>
                                    Registro
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link className="nav-link" to={'/create'}>
                                    Crear Producto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container"></div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-grid gap-2">
                            <table className="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Marca</th>
                                        <th>Producto</th>
                                        <th>Descripción</th>
                                        <th>Imagen</th>
                                        <th>Precio ($)</th>
                                        <th>Existencia</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((ferreArt) => (
                                        <tr>
                                            <td>{ferreArt.brand}</td>
                                            <td>{ferreArt.name}</td>
                                            <td>{ferreArt.description}</td>
                                            <td><img src={ferreArt.path} width="150" /></td>
                                            <td>{ferreArt.price}</td>
                                            <td>{ferreArt.stock}</td>
                                            <td>
                                                <Link to={`edit/${ferreArt.id}`} className="btn btn-light"> <i className="fa-solid fa-user-pen fa-2xl"></i></Link>
                                                <button className="btn btn-danger" onClick={() => confirmDelete(ferreArt.id)}> <i className="fa-solid fa-trash-can fa-2xl"></i> </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 