import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

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
    navigate("/");
  };
  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5">
        <div className="col mt-5">
          <h1 className="text-center">Crear Producto</h1>
          <form onSubmit={createProducto}>
            <div className="mb-3">
              <label className="form-label">
                <b>Marca</b>
              </label>
              <input
                placeholder="Ingrese la marca"
                onChange={(evento) => setBrand(evento.target.value)}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Modelo</b>
              </label>
              <input
                placeholder="Ingrese el producto"
                onChange={(evento) => setName(evento.target.value)}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Descripción</b>
              </label>
              <input
                placeholder="Ingrese la descripción"
                onChange={(evento) => setDescription(evento.target.value)}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Imagen (URL)</b>
              </label>
              <input
                placeholder="Ingrese la URL de la imagen"
                onChange={(evento) => setPath(evento.target.value)}
                className="form-control"
                type="text"
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
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-2xl m-3 btn-success"
            >
              <i class="fa-solid fa-plus"></i> Agregar
            </button>
            <Link to="/" className="btn btn-danger btn-2xl">
              <i class="fa-solid fa-xmark"></i> Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
