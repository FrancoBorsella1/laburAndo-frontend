import React, { useState, useEffect } from 'react';
import logo from "../assets/logos/logo-white.png";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faBriefcase, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BuscarUsuario from './BuscarUsuario';

function Navbar() {
  const navigate = useNavigate();
  
  //Cambiar el color del ícono dependiendo de la página que esté activa
  const location = useLocation();
  const isActive = (pathname) => {
    return location.pathname.includes(pathname);
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    navigate("/");
  }

  //Manejo modal: búsqueda de usuario
  const [modalBusqueda, setModalBusqueda] = useState(false);
  const abrirModalBusqueda = () => {
    setModalBusqueda(true);
  }
  const cerrarModalBusqueda = () => {
    setModalBusqueda(false);
  }

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo"></img>
      <div className="navbar-options">
        {/* Menú principal */}
        <div className="navbar-option">
          <Link to="/home">
            <FontAwesomeIcon
              icon={faHouse}
              className="navbar-icon navbar-house"
              style={{ color: location.pathname === '/home' ? 'white' : 'var(--inactive2)'}}
            />
          </Link>
          {/*<FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>*/}
        </div>
        {/* Mis publicaciones */}
        <div className="navbar-option">
          <Link to="/mispublicaciones">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="navbar-icon navbar-user"
              style={{ color: location.pathname === '/mispublicaciones' ? 'white' : 'var(--inactive2)'}}
            />
          </Link>
          {/*<FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>*/}
        </div>
        {/*Perfil de usuario*/}
        <div className="navbar-option">
          <Link to="/perfil">
            <FontAwesomeIcon
              icon={faUser}
              className="navbar-icon navbar-user"
              style={{ color: location.pathname === '/perfil' ? 'white' : 'var(--inactive2)'}}
            />
          </Link>
          {/*<FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>*/}
        </div>
        {/*Búsqueda de usuario*/}
        <div className="navbar-option" onClick={abrirModalBusqueda}>
            <FontAwesomeIcon
              icon={faSearch}
              className="navbar-icon navbar-user"
              style={{ color: isActive('/PerfilVisitado') ? 'white' : 'var(--inactive2)'}}
            />
        </div>
      </div>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
      {modalBusqueda && (<BuscarUsuario closeModal={cerrarModalBusqueda} />)}
    </nav>
  );
}

export default Navbar;
