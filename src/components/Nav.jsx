import { Link } from "react-router-dom";
import logo from "../assets/Logo2.png";

export const Nav = () => {
  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark border-body fixed-top shadow d-flex"
    >
        <a className="navbar-brand p-2" href="/">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block"
          />{" "}
          Ferretería MiBarrio
        </a>
        <ul className="navbar-nav m-auto">
          <li className="nav-link disabled">
            <Link className="nav-link text-warning" to={"/sign-in"}>
              <i className="fa-solid fa-up-long"></i> Ingreso
            </Link>
          </li>
          <li className="nav-link disabled">
            <Link className="nav-link text-warning" to={"/sign-up"}>
              <i className="fa-solid fa-user"></i> Registro
            </Link>
          </li>
          <li className="nav-link">
            <Link className="nav-link text-warning" to={"/contact"}>
              <i className="fa fa-comments"></i> Contacto
            </Link>
          </li>
          <li className="nav-link">
            <Link className="nav-link text-warning fa-beat-fade" to={"/create"}>
              <i className="fa-solid fa-plus"></i> Crear Producto
            </Link>
          </li>
        </ul>
    </nav>
  )
}
