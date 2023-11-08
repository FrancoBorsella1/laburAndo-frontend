import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan, faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/SolicitudesResenia.css"; /*cambiar*/ 
import "../styles/modal.css"
import axios from 'axios';
import { Link } from "react-router-dom";


function ListaPostulados({ closeModal, idPublicacion }) {

    //Obtengo el token del usuario para poder hacer las peticiones
    const token = localStorage.getItem("token");
    const config = { //token con formato Json
        headers: { Authorization: `Bearer ${token}` } 
    };

    const [postuladosRecuperados, setPostuladosRecuperados] = useState([]);
    const cargarPostulados = () => {
        axios
            .get(`http://localhost:3000/api/publicacion?idPublicacion=${idPublicacion}`, config)
            .then((response) => {
                setPostuladosRecuperados(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos: ', error);
            });
    };

    const eliminarPostulado = (idPostulado, idPublicacion) => {
        axios
            .delete(`http://localhost:3000/api/SolicitudTrabajo/${idPostulado}/${idPublicacion}`, config)
            .then((response) => {
                console.log(response.data);
                cargarPostulados();
            })
            .catch((error) => {
                console.error('Error al obtener datos: ', error);
            });
    }
  
    useEffect(() => {
        cargarPostulados();
    }, []);

    console.log("postulados: ", postuladosRecuperados)
    
    return(
        <div className="modalBackground">
            <div className="contenedor-modal" id="lista-solicitudes">
                <div className="modal-header">
                    <p>Lista de postulados: </p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon" />
                    </button>
                </div>
                <div className="modal-body" id="lista-solicitudes-body">
                    <ul>
                        {postuladosRecuperados.length > 0 ? postuladosRecuperados.map((postulado) => (
                            <li>
                                <p>
                                    {' ' + (postulado.nombre).toUpperCase() + ' ' + (postulado.apellido).toUpperCase() + ' - '}
                                    {postulado.servicios && postulado.servicios.length > 0  ? postulado.servicios[0].nombre: 'Sin servicio'}
                                </p>
                                {postulado.calificacionPromedio + '/5'}<FontAwesomeIcon icon={faStar} size="s" style={{color: "#ffd500",}}/>
                                <div className="lista-solicitudes-botonera">
                                    <Link to={`/PerfilVisitado/${postulado.id}`}>Ir al perfil</Link>
                                    <button id="eliminar-solicitud" onClick={() => eliminarPostulado(postulado.id, idPublicacion)}>
                                        <FontAwesomeIcon icon={faTrashCan} id="trash-icon" />
                                    </button>
                                </div>
                            </li>
                        )): <p id="mensaje">No hay postulados a esta publicación</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ListaPostulados;