import React from "react";
import logo from "../assets/logos/navbar-logo.png";
// import punto from "../assets/icons/icono-punto.svg";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faHouse, faCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    return (
        <nav className="navbar">
            <img src={logo} alt="logo" className="navbar-logo"></img>
            <div className="navbar-options">
                <div className="navbar-option">
                    <FontAwesomeIcon icon={faHouse} className="navbar-icon navbar-house"/>
                    <FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>
                </div>
                <div className="navbar-option">
                    <FontAwesomeIcon icon={faUser} className="navbar-icon navbar-user"/>
                    <FontAwesomeIcon icon={faCircle} className="navbar-icon navbar-circle"/>
                </div>
            </div>          
            <a href="#cerrarsesion">Cerrar sesión</a> {/*Agregar el link hacia la página del login*/}
        </nav>
    );
};


export default Navbar;