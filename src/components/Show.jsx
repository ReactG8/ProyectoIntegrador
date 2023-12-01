import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const mySwal = withReactContent(Swal);

export const Show = () => {
  // const [querySearch, setQuerySearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState(null);
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
  // funcion de searching, a probar!
  // const filteredItems =
  //   querySearch === ""
  //     ? productos
  //     : productos?.filter((e) =>
  //         e.name.toLowerCase().includes(querySearch.toLowerCase())
  //       );
  return (
    <div className="App">
      <div className="container mt-5"></div>
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
      <div className="container-fluid bg-success p-2 text-dark bg-opacity-10">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              {productos && (
                <>
                  <h1 className="mt-5 mx-4">Nuestros productos</h1>
                  {/* <input
                    placeholder="Search..."
                    onChange={(e) => setQuerySearch(e.target.value)}
                  /> */}
                  <div className="d-flex flex-wrap m-3 flex-row justify-content-start align-self-center">
                    <div className="d-flex flex-wrap m-3 flex-row">
                      {productos.map((ferreArt) => (
                        <Card
                          key={ferreArt.id}
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
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
