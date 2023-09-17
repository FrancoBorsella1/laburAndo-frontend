import React from "react";
import logo from "../assets/logos/navbar-logo.png";
import home from "../assets/icons/icono-home.svg";
import profile from "../assets/icons/icono-usuario.svg";
import punto from "../assets/icons/icono-punto.svg";
import "../styles/Navbar.css";


function Navbar() {
    return (
        <nav className="navbar">
            <img src={logo} alt="logo" className="logo"></img>
            <div className="navbar-options">
                <div className="nav-option" id="option-home">
                    <img src={home} alt="home" className="icono-option"></img>
                    <img src={punto} alt="punto" className="icono-punto"></img>
                </div>
                <div className="nav-option" id="option-profile">
                    <img src={profile} alt="profile" className="icono-option"></img>
                    <img src={punto} alt="punto" className="icono-punto"></img>
                </div>
            </div>          
            <a href="#cerrarsesion">Cerrar sesión</a> {/*Agregar el link hacia la página del login*/}
        </nav>
    );
};


export default Navbar;