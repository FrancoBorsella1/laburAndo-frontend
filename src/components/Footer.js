import React from "react";
import logo from "../assets/logos/footer-logo.png";
import icoFacebook from "../assets/icons/footer-facebook.png";
import icoInstagram from "../assets/icons/footer-instagram.png";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <div className="footer">
            <div className="openClose-footer">
                <div className="footer-circle">
                    <FontAwesomeIcon icon={faInfo} className="footer-openclose-icon"/>
                </div>
            </div>
            <footer>
                <div className="footer-informacion"> 
                    <a href="#Contacto">Contacto</a>
                    <a href="#AcercaDe">Acerca de</a>
                </div>
                <div className="footer-laburando">
                    <img src={logo} alt="logos" className="footer-logo"></img>
                </div>
                <div className="footer-redes">
                    <img src={icoFacebook} alt="facebook" className="footer-ico"></img>
                    <img src={icoInstagram} alt="instagram" className="footer-ico"></img>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

