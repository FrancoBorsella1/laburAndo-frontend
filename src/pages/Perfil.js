import React from 'react';
// import logo from "../assets/logos/logo-original.png";
import "../styles/Perfil.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot  } from "@fortawesome/free-solid-svg-icons";

function Perfil({nombre, telefono, mail, localidad}) {
    return (
        <>
            <Navbar/>
            <main id="contenedor-perfil">
                <div id='tarjeta-perfil'>
                    <div className='perfil-foto'>
                        <img alt="foto"/>
                    </div>
                    <div className='perfil-informacion'>
                        <p className='perfil-nombre'>{nombre}</p>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faPhone} id="icono-telefono"/><span> {telefono}</span>
                        </div>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faEnvelope} id="icono-mail"/><span> {mail}</span>
                        </div>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faLocationDot} id="icono-ubicacion"/><span> {localidad}</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Perfil;