import { useState } from "react";
import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebaseConfig/firebase.js"
import "./Create.css"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal2 = withReactContent(Swal);

export const Create = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [path2, setPath2] = useState("");
  const [path3, setPath3] = useState("");
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
      path2: path2,
      path3: path3,
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
              <label className="form-label">Imágenes </label>
              <input
                accept="image/*"
                onChange={async (evento) => {
                  const archivoImg = evento.target.files[0]
                  const refArchivo = ref(storage, `${archivoImg.name}`)
                  await uploadBytes(refArchivo, archivoImg)
                  setPath(await getDownloadURL(refArchivo))
                }}
                className="form-control"
                type="file"
                required />
            </div>
            <div className="mb-3">
              <input
                accept="image/*"
                type="file"
                className="form-control"
                onChange={async (evento) => {
                  const archivoImg = evento.target.files[0]
                  const refArchivo = ref(storage, `${archivoImg.name}`)
                  await uploadBytes(refArchivo, archivoImg)
                  setPath2(await getDownloadURL(refArchivo))
                }}
                required />
            </div>
            <div className="mb-3">
              <input
                accept="image/*"
                type="file"
                className="form-control"
                onChange={async (evento) => {
                  const archivoImg = evento.target.files[0]
                  const refArchivo = ref(storage, `${archivoImg.name}`)
                  await uploadBytes(refArchivo, archivoImg)
                  setPath3(await getDownloadURL(refArchivo))
                }}
                required />
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
                step="0.01"
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
        <div className="col auto text-center">
          <div className="center-block">
            <img
              src={path}
              alt="Previsualización de Imagen 1 del producto"
              width="150"
              className="d-inline-block">
            </img>
            <img
              src={path2}
              alt="Previsualización de Imagen 2 del producto"
              width="150"
              className="d-inline-block">
            </img>
            <img
              src={path3}
              alt="Previsualización de Imagen 3 del producto"
              width="150"
              className="d-inline-block">
            </img>
          </div>
        </div>
      </div>
    </div>
  );
};
