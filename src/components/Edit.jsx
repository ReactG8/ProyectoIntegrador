import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase.js"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const mySwal = withReactContent(Swal)

export const Edit = () => {
    const [brand, setBrand] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [path, setPath] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")

    const navigate = useNavigate()

    const { id } = useParams()

    const update = async (evento) => {
        evento.preventDefault()
        const ferreArtDoc = doc(db, "productos", id)
        const data = {
            brand: brand,
            name: name,
            description: description,
            path: path,
            price: price,
            stock: stock
        }
        await updateDoc(ferreArtDoc, data)
        navigate("/")
    }
    const getFerreArtPorID = async (id) => {
        const ferreArtDoc = await getDoc(doc(db, "productos", id))
        if (ferreArtDoc.exists()) {
            setBrand(ferreArtDoc.data().brand)
            setName(ferreArtDoc.data().name)
            setDescription(ferreArtDoc.data().description)
            setPath(ferreArtDoc.data().path)
            setPrice(ferreArtDoc.data().price)
            setStock(ferreArtDoc.data().stock)
        } else {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "¡Algo salió mal! No se encontró el Producto.",
            });
            
        }
    }
    useEffect(() => {
        getFerreArtPorID(id)
    }, [productos])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Editar Producto</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label">Marca </label>
                            <input value={brand} onChange={(evento) => setBrand(evento.target.value)} className="form-control" type="text" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Modelo </label>
                            <input value={name} onChange={(evento) => setName(evento.target.value)} className="form-control" type="text" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción </label>
                            <input value={description} onChange={(evento) => setDescription(evento.target.value)} className="form-control" type="text" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagen (URL) </label>
                            <input value={path} onChange={(evento) => setPath(evento.target.value)} className="form-control" type="text" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio </label>
                            <input value={price} onChange={(evento) => setPrice(evento.target.value)} className="form-control" type="number" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Existencia </label>
                            <input value={stock} onChange={(evento) => setStock(evento.target.value)} className="form-control" type="number" />
                        </div>
                        <button type="submit" className="btn btn-secondary btn-2xl">Editar</button>
                        <Link to="/" className="btn btn-danger btn-2xl">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    )
} 