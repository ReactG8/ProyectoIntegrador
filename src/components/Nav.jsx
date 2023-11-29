import { Link } from "react-router-dom";
import logo from "../assets/Logo2.png";



export const Nav = () => {
  return (
    <nav
className="navbar navbar-dark bg-dark navbar-expand-lg bg-dark border-bottom border-body fixed-top"
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
</nav>
  )
}
