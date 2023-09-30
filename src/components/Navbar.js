import React, { useState } from "react";
import logo from "../assets/logos/logo-white.png";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo"></img>
      <div className="navbar-options">
        <div className="navbar-option">
          <Link to="/home">
            <FontAwesomeIcon
              icon={faHouse}
              className="navbar-icon navbar-house"
            />
          </Link>
          {/*<FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>*/}
        </div>
        <div className="navbar-option">
          <Link to="/perfil">
            <FontAwesomeIcon
              icon={faUser}
              className="navbar-icon navbar-user"
            />
          </Link>
          {/*<FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>*/}
        </div>
      </div>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;
