import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../styles/SolicitudesResenia.css"; /*cambiar*/ 
import "../styles/modal.css"
import AltaResena from './AltaResena';
import axios from 'axios';


function SolicitudesResenia({ closeModal, idCalificadorProp}) {
    const [solicitudesRecuperadas, setSolicitudesRecuperadas] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/resenas?idCalificador=${idCalificadorProp}`)
            .then((response) => {
                setSolicitudesRecuperadas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos: ', error);
            })
    }, []);
    console.log('resenas recuperadass: ', solicitudesRecuperadas);

    // Manejo del modal: alta de reseña
    const [modalAltaResenia, setmodalAltaResenia] = useState(false);
    const abrirModalAltaResenia = () => {
        setmodalAltaResenia(true);
    }
    const cerrarModalAltaResenia = () => {
        setmodalAltaResenia(false);
    }

    return(
        <div className="modalBackground">
        <div className="contenedor-modal" id="lista-solicitudes">
            <div className="modal-header">
                <p>Lista de solicitudes de reseña: </p>
                <button id="cerrar-modal" onClick={() => closeModal(false)}>
                    <FontAwesomeIcon icon={faXmark} id="close-icon" />
                </button>
            </div>
            <div className="modal-body" id="lista-solicitudes-body">
                <ul>
                    {solicitudesRecuperadas.map((solicitud) => (
                        <li>
                            <p>
                                {(solicitud.calificado.nombre).toUpperCase() + ' ' + (solicitud.calificado.apellido).toUpperCase() + ' - '}
                                {solicitud.calificado.servicios && solicitud.calificado.servicios.length > 0  ? solicitud.calificado.servicios[0].nombre: 'Sin servicio'}
                            </p>
                            <div className="lista-solicitudes-botonera">
                                <button className="lista-solicitudes-boton" type="button" onClick={abrirModalAltaResenia}>Valorar</button>
                                <button id="eliminar-solicitud">
                                    <FontAwesomeIcon icon={faTrashCan} id="trash-icon" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
        {modalAltaResenia && (<AltaResena closeModal={cerrarModalAltaResenia}/>)}
        </div>
    );
}

export default SolicitudesResenia;