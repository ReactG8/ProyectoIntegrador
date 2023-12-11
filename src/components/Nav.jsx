import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo6Chico.png";
import "./Nav.css"

export const Nav = () => {

  const location = useLocation();
  const currentView = location.pathname;

  const allowedRoutesLogin = ["/", "/contact"];
  const shouldShowLinkLogin = allowedRoutesLogin.includes(currentView);

  const allowedRoutesContact = ["/"];
  const shouldShowLinkContact = allowedRoutesContact.includes(currentView);

  const allowedSignOutCreateService = ["/admin"];
  const shouldShowLinkSignOutCreateService = allowedSignOutCreateService.includes(currentView);

  return (

    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark border-body fixed-top shadow d-flex"
    >
      <button className="navbar-toggler m-3" type="button" data-bs-toggle="collapse" data-bs-target="#opciones">
        <span className="navbar-toggler-icon"></span>
      </button>
      
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="logoFerreteria"
          />
        </a>
        <h3 className="nonbre text-light">Ferretería MiBarrio</h3>

        <div className="collapse navbar-collapse m-3" id="opciones">   
          <ul className="navbar-nav">

            {shouldShowLinkLogin && (
              <li className="nav-item">
                <Link className="nav-link text-warning" to={"/login"}>
                  <i className="fa-solid fa-user"></i> Ingresar
                </Link>
              </li>
            )}

            {shouldShowLinkContact && (
              <li className="nav-item">
                <Link className="nav-link text-warning" to={"/contact"}>
                  <i className="fa fa-comments"></i> Contacto
                </Link>
              </li>
            )}

            {shouldShowLinkSignOutCreateService && (
              <li className="nav-item">
                <Link className="nav-link text-warning" to={"/signout"}>
                  <i className="fa-solid fa-down-long"></i> Salir
                </Link>
              </li>
            )}

            {shouldShowLinkSignOutCreateService && (
              <li className="nav-item">
                <Link className="nav-link text-warning fa-beat-fade" to={"/create"}>
                  <i className="fa-solid fa-plus"></i> Crear Producto
                </Link>
              </li>
            )}

            {shouldShowLinkSignOutCreateService && (
              <li className="nav-item">
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
