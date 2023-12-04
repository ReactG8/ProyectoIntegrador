import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Pagination } from "./Pagination.jsx";
import "./Show.css"

const mySwal = withReactContent(Swal);

export const Show = () => {
  const [error, setError] = useState(null);
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(4); // Número de productos por página

  const productosCollection = collection(db, "productos");
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
    <div className="App margin-footer">
      {/* El nav fue movido a un componente nuevo
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top"
        data-bs-theme="dark"
      >
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <a className="navbar-brand" href="/">
                <img
                  src={logo}
                  alt="Logo"
                  width="50"
                  height="50"
                  className="d-inline-block"
                />{" "}
                Ferretería
              </a>
              <li className="nav-link disabled">
                <Link className="nav-link" to={"/sign-in"}>
                  Ingreso
                </Link>
              </li>
              <li className="nav-link disabled">
                <Link className="nav-link" to={"/sign-up"}>
                  Registro
                </Link>
              </li>
              <li className="nav-link">
                <Link className="nav-link" to={"/create"}>
                  Crear Producto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <div className="container "></div>
      {/*Condicionales para renderizar el contenido dependiendo del estado */}
      {loading && (
        <div className="d-flex border container">
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
      <div className=" mb-5 container-fluid bg-success p-2 text-dark bg-opacity-10">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              {currentProductos && (
                <>
                  <h1 className="mt-5 mx-4">Nuestros productos</h1>
                  <div className="d-flex flex-wrap m-3 flex-row">
                    {currentProductos.map((ferreArt) => (
                      <Card
                        style={{ width: "18rem", height: "35rem" }}
                        className="m-3 justify-content-end border border-secondary shadow"
                      >
                        <Card.Img
                          variant="top"
                          style={{ width: "17.9rem", height: "14rem" }}
                          src={ferreArt.path}
                        />
                        <Card.Body>
                          <Card.Title>{ferreArt.name}</Card.Title>
                          <Card.Title className="text-danger">
                            {ferreArt.brand}
                          </Card.Title>
                          <Card.Text>{ferreArt.description}</Card.Text>
                          <Card.Text>
                            <b>Stock:</b> {ferreArt.stock}
                          </Card.Text>
                          <Card.Text>
                            <b>Precio:</b> $ {ferreArt.price}
                          </Card.Text>
                          <Button variant="success" className="mx-1">
                            <i className="fa-solid fa-cart-shopping fa-sm"></i>{" "}
                            Comprar
                          </Button>
                          <Link
                            to={`edit/${ferreArt.id}`}
                            className="btn btn-light mx-1 bg-info"
                          >
                            {" "}
                            <i className="fa-solid fa-user-pen fa-2xl"></i>
                          </Link>
                          <Button
                            className="btn btn-danger mx-1"
                            onClick={() => confirmDelete(ferreArt.id)}
                          >
                            {" "}
                            <i className="fa-solid fa-trash-can fa-2xl"></i>{" "}
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
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
  );
};
