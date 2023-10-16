import React, { useState, useEffect } from 'react';
// import logo from "../assets/logos/logo-original.png";
import "../styles/Perfil.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faStar, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import jwtDecode from "jwt-decode"; //npm install jwt-decode
import { Link } from 'react-router-dom';
import Resena from '../components/Resena';

function Perfil() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const [user, setUser] = useState({});


    useEffect(() => {
        axios.get(`http://localhost:3000/api/usuario/${decoded.id}`, config)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });      
    },[]);
    console.log("estado: ", user)

    return (
        <>
            <Navbar/>
            <main id="contenedor-perfil">
                <div id='tarjeta-perfil'>
                    <div className='tarjeta-perfil-header'>
                        <p className='perfil-nombre'>{user.nombre && user.apellido ? user.nombre + ' ' + user.apellido: 'Juan Perez'}</p>
                        <div id='perfil-promedio-resena'>
                            <span>2.5/5</span><FontAwesomeIcon icon={faStar} style={{color: "#ffd500",}} id="icono-resena"/>
                        </div>
                    </div>
                    <div className='tarjeta-perfil-body'>
                        <div className='perfil-informacion'>
                            <div className='perfil-foto'>
                                <img alt="foto"/>
                            </div>
                            <p className='perfil-descripcion'>Hace 10 años realizo trabajos de electricidad, mi espe asdfhaksdhf kasdhfkahdksjf hasdfh kjahsdfkj ahskdjfh akjsdhfajksdh kksfadhsf kjlahsdon las instalaciones eléctricas. Me considero una persona responsable y comprometida con su trabajo.</p>
                        </div>
                        <div className='perfil-contacto'>
                            <div className='perfil-contacto-datos'>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faWhatsapp} beatFade  size="lg" style={{color: "2dd100", margin:"0 8px"}} id="icono-whatsapp"/><Link>Enviar un mensaje</Link>
                                </div>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faPhone} id="icono-telefono"/><span> {user.telefono ? user.telefono: '1111111111'}</span>
                                </div>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faEnvelope} id="icono-mail"/><span> {user.email ? user.email: 'mail@mail.com'}</span>
                                </div>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faLocationDot} id="icono-ubicacion"/><span> {user.localidad && user.apellido ? user.localidad.nombre + ', ' + user.localidad.provincia.nombre: 'Algun lugar'} </span>
                                </div>
                                <button>SOLICITAR RESEÑA</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="linea-resultados">
                    <div className="linea-horizontal"></div>
                    <p>Resultados</p>
                    <FontAwesomeIcon icon={faCaretDown}/>
                    <div className="linea-horizontal"></div>
                </div>
                <div id='contenedor-resenas'>
                    <Resena/>
                    <Resena/>
                    <Resena/>
                    <Resena/>
                </div>
            </main>

            {/* <main id="contenedor-perfil">
                <div id='tarjeta-perfil'>
                    <div className='perfil-foto'>
                        <img alt="foto"/>
                    </div>
                    <div className='perfil-informacion'>
                        <p className='perfil-nombre'>{user.nombre && user.apellido ? user.nombre + ' ' + user.apellido: 'Cargando...'}</p>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faPhone} id="icono-telefono"/><span> {user.telefono ? user.telefono: 'Cargando...'}</span>
                        </div>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faEnvelope} id="icono-mail"/><span> {user.email ? user.email: 'Cargando...'}</span>
                        </div>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faLocationDot} id="icono-ubicacion"/><span> {user.localidad && user.apellido ? user.localidad.nombre + ', ' + user.localidad.provincia.nombre: 'Cargando...'} </span>
                        </div>
                    </div>
                </div>
            </main> */}
            <Footer/>
        </>
    );


};

export default Perfil;