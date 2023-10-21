import React, { useState, useEffect } from 'react';
// import logo from "../assets/logos/logo-original.png";
import "../styles/Perfil.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faStar, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Resena from '../components/Resena';
import ConfirmacionResena from '../components/ConfirmacionResena';
import { useParams } from 'react-router-dom';

function PerfilVisitado() {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const [user, setUser] = useState({});
    const { id } = useParams();

    //Manejar el estado del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    let sinServicioAsociado = 'No brindo servicios';
    let sinServicioDescripcion = 'Soy una persona que siempre necesita a alguien para todo. A veces necesito a alguien para resolver problemas de limpieza, arreglar cables o cañerías';

    //Petición para completar los datos del usuario logeado
    useEffect(() => {
        axios.get(`http://localhost:3000/api/usuario/${id}`, config)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });      
    },[]);

    //Recuperación de reseñas correpsondientes al perfil del usuario logeado
    const [resenasRecuperadas, setResenasRecuperadas] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/resenas?idCalificado=${id}`, config)
            .then((response) => {
                setResenasRecuperadas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos: ', error);
            })
    }, []);
    console.log('resenas recuperadass: ', resenasRecuperadas);

    return (
        <>
            <Navbar/>
            <main id="contenedor-perfil">
                <div id='tarjeta-perfil'>
                    <div className='tarjeta-perfil-header'>
                        <p className='perfil-nombre'>{user.nombre && user.apellido ? user.nombre + ' ' + user.apellido: ''}</p>
                        <div id='perfil-promedio-resena'>
                            <span>2.5/5</span><FontAwesomeIcon icon={faStar} style={{color: "#ffd500",}} id="icono-resena"/>
                        </div>
                    </div>
                    <div className='tarjeta-perfil-body'>
                        <div className='perfil-informacion'>
                            <h4>
                                {user.servicios && user.servicios.length > 0 ? user.servicios[0].nombre: sinServicioAsociado}
                            </h4>
                            <div className='perfil-foto'>
                                <img alt="foto"/>
                            </div>
                            <p className='perfil-descripcion'>
                                {user.servicios && user.servicios.length > 0 ? user.servicios[0].descripcion: sinServicioDescripcion}
                            </p>
                        </div>
                        <div className='perfil-contacto'>
                            <div className='perfil-contacto-datos'>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faWhatsapp} beatFade  size="lg" style={{color: "2dd100", margin:"0 8px"}} id="icono-whatsapp"/><Link>Enviar un mensaje</Link>
                                </div>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faPhone} id="icono-telefono"/><span> {user.telefono ? user.telefono: ''}</span>
                                </div>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faEnvelope} id="icono-mail"/><span> {user.email ? user.email: ''}</span>
                                </div>
                                <div className='item-informacion'>
                                    <FontAwesomeIcon icon={faLocationDot} id="icono-ubicacion"/><span> {user.localidad && user.apellido ? user.localidad.nombre + ', ' + user.localidad.provincia.nombre: 'Algun lugar'} </span>
                                </div>
                                <button onClick={openModal}>SOLICITAR RESEÑA</button>
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
                <div  id='contenedor-resenas'>
                        {resenasRecuperadas.length > 0 ? resenasRecuperadas.map((resena) => (

                            <Resena
                                resenadorProp={resena.calificador.nombre + ' ' + resena.calificador.apellido}
                                fechaProp={resena.fecha}
                                descripcionProp={resena.descripcion}
                                calificacionProp={resena.calificacion}
                            />
                        )): <p>No hay reseñas para mostrar</p>}
                </div>
                {isModalOpen && (
                <ConfirmacionResena closeModal={closeModal} idCalificadorProp={id}/>
                )}
            </main>
            <Footer/>
        </>
    );


};

export default PerfilVisitado;