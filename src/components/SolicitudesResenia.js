import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../styles/SolicitudesResenia.css"; /*cambiar*/ 
import "../styles/modal.css"
import AltaResena from './AltaResena';


function SolicitudesResenia({ closeModal }) {

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
                    <li>
                        <p>Franco Ezequiel Borsella - Electricista</p>
                        <div className="lista-solicitudes-botonera">
                            <button className="lista-solicitudes-boton" type="button" onClick={abrirModalAltaResenia}>Valorar</button>
                            <button id="eliminar-solicitud">
                                <FontAwesomeIcon icon={faTrashCan} id="trash-icon" />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        {modalAltaResenia && (<AltaResena closeModal={cerrarModalAltaResenia}/>)}
        </div>
    );
}

export default SolicitudesResenia;