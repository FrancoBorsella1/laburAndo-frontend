import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles/SolicitudesResenia.css"; /*cambiar*/ 
import "../styles/modal.css"
import AltaResena from './AltaResena';


function SolicitudesResenia({ closeModal }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal(true);
    }
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
                    <p>Lista de solicitudes de reseña de trabajadores: </p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon" />
                    </button>
                </div>
                <div className="modal-body" id="alta-resena-body">
                    <textarea
                        id="alta-resena-descripcion"
                        placeholder="Descripción..."
                    />
                    <div className="alta-resena-opciones">
                        <select>
                            <option value="" disabled selected hidden>
                                Calificación
                            </option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button className="alta-resena-boton" type="button" onClick={abrirModalAltaResenia}>Calificar</button>
                    </div>
                </div>
            </div>
            {modalAltaResenia && (<AltaResena closeModal={cerrarModalAltaResenia}/>)}
        </div>
    );
}

export default SolicitudesResenia;