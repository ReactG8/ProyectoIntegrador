import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from 'react-bootstrap/Carousel';
import { Pagination } from "./Pagination.jsx";
import "./Show.css"
import { ShowComments } from "./ShowComments.jsx"

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

  const confirmBuy = (name) => {

    Swal.fire({
      title: "¿Está seguro?",
      text: `"Usted está por agregar el producto ${name} al carrito de compras"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`${name}"¡Agregado al carrito de compras!", "Puede proceder a efectuar su compra", "Producto elegido"`);
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
    <div className="container-fluid app">
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
      <div className=" mb-5 container-fluid p-2 text-dark paletaColor">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              {currentProductos && (
                <>
                  <h1 className="mt-5 mx-4">Nuestros productos</h1>
                  <div className="d-flex flex-wrap m-3 flex-row justify-content-center">
                    {currentProductos.map((ferreArt) => (
                      <Card key={ferreArt.id}
                        style={{ width: "18rem", height: "35rem" }}
                        className="m-3 justify-content-end border border-secondary shadow"
                      >
                        {/*empieza slide  con bootstrap*/}
                        <Carousel data-bs-theme="dark" interval={null}>
                          <Carousel.Item>
                            <Card.Img
                              variant="top"
                              style={{ width: "17.9rem", height: "14rem" }}
                              src={ferreArt.path}
                              alt="First slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <Card.Img
                              variant="top"
                              style={{ width: "17.9rem", height: "14rem" }}
                              src={ferreArt.path2}
                              alt="Second slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <Card.Img
                              variant="top"
                              style={{ width: "17.9rem", height: "14rem" }}
                              src={ferreArt.path3}
                              alt=" Third slide"
                            />
                          </Carousel.Item>
                        </Carousel>
                        {/*Termina slide  con bootstrap*/}
                        <Card.Body id="interior_tarjeta" className="d-flex flex-column justify-content-start align-items-start">
                          <Card.Title className="nombreProducto">{ferreArt.name}</Card.Title>
                          <Card.Title className="text-danger">
                            {ferreArt.brand}
                          </Card.Title>
                          <Card.Text className="card-description">{ferreArt.description}</Card.Text>
                          <Card.Text>
                            <b>Stock:</b>&nbsp; {ferreArt.stock}
                          </Card.Text>
                          <Card.Text>
                            <b>Precio:</b>&nbsp; $ {ferreArt.price}
                          </Card.Text>
                          <Button variant="success" className="mx-1 botonComprar" onClick={() => confirmBuy(ferreArt.name)}>
                            <i className="fa-solid fa-cart-shopping fa-sm"></i>{" "}
                            Comprar
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
                  <ShowComments />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
