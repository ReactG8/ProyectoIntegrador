export const Footer = () => {
  return (
    <footer className="bg-dark text-white fixed-bottom d-flex flex-wrap justify-content-center">
      <div>
        <ul className="nav navbar-expand-lg justify-content-center border-bottom mb-2">
          <li className="nav-item">
            <a href="#!" className="nav-link px-2 text-white">
              <i className="fa-brands fa-instagram fa-xl"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link px-2 text-white">
              <i className="fa-brands fa-facebook fa-xl"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link px-2 text-white">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link px-2 text-white">
              <i className="fa-brands fa-whatsapp fa-xl"></i>
            </a>
          </li>
        </ul>
        <p className="text-center text-white">© Grupo 8 - Codo a Codo 2023</p>
      </div>
    </footer>
  );
};
