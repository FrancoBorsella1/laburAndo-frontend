import React, { useState, useEffect } from 'react';
// import logo from "../assets/logos/logo-original.png";
import "../styles/Perfil.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot  } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import jwtDecode from "jwt-decode"; //npm install jwt-decode

function Perfil() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        axios.get(`http://localhost:3000/api/usuario/${decoded.id}`, config)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(user)

    }, []);

    return (
        <>
            <Navbar/>
            <main id="contenedor-perfil">
                <div id='tarjeta-perfil'>
                    <div className='perfil-foto'>
                        <img alt="foto"/>
                    </div>
                    <div className='perfil-informacion'>
                        <p className='perfil-nombre'>{user.nombre + ' ' + user.apellido }</p>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faPhone} id="icono-telefono"/><span> {user.telefono}</span>
                        </div>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faEnvelope} id="icono-mail"/><span> {user.email}</span>
                        </div>
                        <div className='item-informacion'>
                            <FontAwesomeIcon icon={faLocationDot} id="icono-ubicacion"/><span> {user.localidad.nombre + ', ' + user.localidad.provincia.nombre} </span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Perfil;