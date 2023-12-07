import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Edit.css"

const mySwal2 = withReactContent(Swal);

export const Edit = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const updateProducto = async (evento) => {
    evento.preventDefault();
    const ferreArtDoc = doc(db, "productos", id);
    const data = {
      brand: brand,
      name: name,
      description: description,
      path: path,
      price: price,
      stock: stock,
    };

    await updateDoc(ferreArtDoc, data);

    Swal.fire({
      icon: "success",
      title: "¡Cambios guardados!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/admin");
  };
  const getFerreArtPorID = async (id) => {
    const ferreArtDoc = await getDoc(doc(db, "productos", id));
    if (ferreArtDoc.exists()) {
      setBrand(ferreArtDoc.data().brand);
      setName(ferreArtDoc.data().name);
      setDescription(ferreArtDoc.data().description);
      setPath(ferreArtDoc.data().path);
      setPrice(ferreArtDoc.data().price);
      setStock(ferreArtDoc.data().stock);
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "¡Algo salió mal! No se encontró el Producto.",
      });
    }
  };

  useEffect(() => {
    getFerreArtPorID(id);
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col ">
          <h1 className="text-center mb-3">Editar Producto</h1>
          <form onSubmit={updateProducto}>
            <div className="mb-3">
              <label className="form-label">
                <b>Marca</b>
              </label>
              <textarea
                value={brand}
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
                value={name}
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
                rows={2}
                value={description}
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
                value={path}
                rows={4}
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
                value={price}
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
                value={stock}
                onChange={(evento) => setStock(evento.target.value)}
                className="form-control"
                type="number"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-2xl m-3 btn-success">
              <i className="fa-solid fa-floppy-disk"></i> Guardar cambios
            </button>
            <Link to="/admin" className="btn btn-danger btn-2xl">
              <i className="fa-solid fa-xmark"></i> Cancelar
            </Link>
          </form>
        </div>
        <div className="col auto text-center">
          <div className="center-block">
            <img src={path} onChange={(evento) => setPrice(evento.target.src)} alt="Previsualización de Imagen del producto" width="200" className="d-inline-block"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
