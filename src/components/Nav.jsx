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
          width="60"
          height="60"
          className="d-inline-block"
        />{" "}
        Ferretería MiBarrio
      </a>
      <li className="nav-link disabled">
        <Link className="nav-link text-warning" to={"/sign-in"}>
        <i class="fa-solid fa-up-long"></i> Ingreso
        </Link>
      </li>
      <li className="nav-link disabled">
        <Link className="nav-link text-warning" to={"/sign-up"}>
        <i class="fa-solid fa-user"></i> Registro
        </Link>
      </li>
      <li className="nav-link">
        <Link className="nav-link text-warning fa-beat-fade" to={"/create"}>
        <i class="fa-solid fa-plus"></i> Crear Producto
        </Link>
      </li>
    </ul>
  </div>
</div>
</nav>
  )
}
