import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo6Chico.png";


export const Nav = () => {

  const location = useLocation();
  const currentView = location.pathname;

  const allowedRoutesLoginContact = ["/"];
  const shouldShowLinkLoginContact = allowedRoutesLoginContact.includes(currentView);

  const allowedSignOutCreateService = ["/admin"];
  const shouldShowLinkSignOutCreateService = allowedSignOutCreateService.includes(currentView);

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark border-body fixed-top shadow d-flex"
    >
      <div>
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

          {shouldShowLinkLoginContact && (
            <li className="nav-link">
              <Link className="nav-link text-warning" to={"/login"}>
                <i className="fa-solid fa-user"></i> Ingresar
              </Link>
            </li>
          )}

          {shouldShowLinkLoginContact && (
            <li className="nav-link">
              <Link className="nav-link text-warning" to={"/contact"}>
                <i className="fa fa-comments"></i> Contacto
              </Link>
            </li>
          )}

          {shouldShowLinkSignOutCreateService && (
            <li className="nav-link">
              <Link className="nav-link text-warning" to={"/signout"}>
                <i className="fa-solid fa-down-long"></i> Salir
              </Link>
            </li>
          )}

          {shouldShowLinkSignOutCreateService && (
            <li className="nav-link">
              <Link className="nav-link text-warning fa-beat-fade" to={"/create"}>
                <i className="fa-solid fa-plus"></i> Crear Producto
              </Link>
            </li>
          )}

          {shouldShowLinkSignOutCreateService && (
            <li className="nav-link">
              <Link className="nav-link text-warning" to={"/comentarios"}>
                Servicio al Cliente
              </Link>
            </li>
          )}

        </ul>
      </div>
    </nav>
  )
}
