import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import "./Create.css"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal2 = withReactContent(Swal);

export const Create = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const productosCollection = collection(db, "productos");

  const createProducto = async (evento) => {
    evento.preventDefault();
    await addDoc(productosCollection, {
      brand: brand,
      name: name,
      description: description,
      path: path,
      price: price,
      stock: stock,
    });

    Swal.fire({
      icon: "success",
      title: "¡Producto creado exitosamente!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/admin");
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col">
          <h1 className="text-center margin-navbar">Crear Producto</h1>
          <form className="mb-3 mt-5" onSubmit={createProducto}>
            <div className="mb-3">
              <label className="form-label">
                <b>Marca</b>
              </label>
              <textarea
                placeholder="Ingrese la marca"
                rows={1}
                onChange={(evento) => setBrand(evento.target.value)}
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Modelo</b>
              </label>
              <textarea
                placeholder="Ingrese el producto"
                rows={1}
                onChange={(evento) => setName(evento.target.value)}
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Descripción</b>
              </label>
              <textarea
                placeholder="Ingrese la descripción"
                rows={3}
                onChange={(evento) => setDescription(evento.target.value)}
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Imagen (URL)</b>
              </label>
              <textarea
                placeholder="Ingrese la URL de la imagen"
                rows={3}
                onChange={(evento) => setPath(evento.target.value)}
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Precio</b>
              </label>
              <input
                placeholder="Ingrese el precio"
                onChange={(evento) => setPrice(evento.target.value)}
                className="form-control"
                type="number"
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Existencia</b>
              </label>
              <input
                placeholder="Ingrese la cantidad de producto"
                onChange={(evento) => setStock(evento.target.value)}
                className="form-control"
                type="number"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-2xl m-3 btn-success"
            >
              <i className="fa-solid fa-plus"></i> Agregar
            </button>
            <Link to="/admin" className="btn btn-danger btn-2xl">
              <i className="fa-solid fa-xmark"></i> Cancelar
            </Link>
          </form >
        </div>
        <div className="col auto text-center"><div className="center-block"><img src={path} onChange={(evento) => setPrice(evento.target.src)} alt="Previsualización de Imagen del producto" width="300" className="d-inline-block"></img></div></div>
      </div>
    </div>
  );
};
