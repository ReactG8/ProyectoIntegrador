import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pagination } from "./Pagination.jsx";
import "./Admin.css"

const mySwal = withReactContent(Swal);

export const Admin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState(null);
  const productosCollection = collection(db, "productos");

  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(4); // Número de productos por página

  const getProductos = async () => {
    try {
      const data = await getDocs(productosCollection);
      setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteFerreArt = async (id) => {
    const productosDoc = doc(db, "productos", id);
    await deleteDoc(productosDoc);
    await getProductos();
  };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡No se podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡quiero eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFerreArt(id);
        Swal.fire("¡Borrado!", "El documento ha sido eliminado.", "success");
      }
    });
  };
  useEffect(() => {
    getProductos();
  }, []);

  // Calcular índices de productos para la página actual
  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = productos && productos.slice(indexOfFirstProducto, indexOfLastProducto);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Página siguiente
  const nextPage = () => {
    if (currentPage < Math.ceil(productos.length / productosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App appContainer">
      <div className="container mt-5 m-0"></div>
      {/*Condicionales para renderizar el contenido dependiendo del estado */}
      {loading && (
        <div className="d-flex   border container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && (
        <>
          <h1>Hubo un error en la base de datos: {error}</h1>
        </>
      )}
      <div className="margin-navbar">
        <div className="container-fluid flex-wrap justify-content-center;
}">
          <div className="row">
            <div className="col">
              <div className="d-grid gap-2">
                {currentProductos && (
                  <>
                    <table className="table table-dark table table-striped table-hover">
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
                        {currentProductos.map((ferreArt) => (
                          <tr key={ferreArt.id}>
                            <td>{ferreArt.brand}</td>
                            <td>{ferreArt.name}</td>
                            <td>{ferreArt.description}</td>
                            <td>
                              <img
                                src={ferreArt.path}
                                width="150"
                                alt={ferreArt.name}
                              />
                            </td>
                            <td>{ferreArt.price}</td>
                            <td>{ferreArt.stock}</td>
                            <td>
                              <Link
                                to={`/admin/edit/${ferreArt.id}`}
                                className="btn btn-light"
                              >
                                {" "}
                                <i className="fa-solid fa-user-pen fa-2xl"></i>
                              </Link>
                              <button
                                className="btn btn-danger ms-1"
                                onClick={() => confirmDelete(ferreArt.id)}
                              >
                                {" "}
                                <i className="fa-solid fa-trash-can fa-2xl"></i>{" "}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Componente de paginación */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(productos.length / productosPerPage)}
                      onPageChange={paginate}
                      onPrevPage={prevPage}
                      onNextPage={nextPage}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};