import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "../styles/ConfirmacionResena.css";
import "../styles/modal.css";

function ConfirmacionResena({ closeModal }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal(true);
    }

    return(
        <div className="modalBackground">
            <div className="contenedor-modal" id="confirmar-resena">
                <div className="modal-header">
                    <p>Solicitud de reseña</p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon" />
                    </button>
                </div>
                <div className="modal-body" id="confirmar-resena-body">
                    <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#0ac2ff"}} id="exclamation-icon" />
                    <p>Se enviará una solicitud de reseña como trabajador. Presione 'OK' para confirmar que usted realizó un trabajo para Usuario </p>
                </div>
                <div className="modal-footer" id="confirmar-resena-footer">
                    <button onClick={() => closeModal(false)} className="boton-cancelar">Cancelar</button>
                    <button onClick={handleSubmit} className="boton-confirmar">OK</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmacionResena;
