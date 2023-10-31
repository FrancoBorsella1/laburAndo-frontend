import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "../styles/ConfirmacionResena.css";
import "../styles/modal.css";
import axios from "axios";
import jwtDecode from "jwt-decode"; //npm install jwt-decode


function ConfirmacionResena({ closeModal,idCalificadorProp}) {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const solicitudReseña = {
        idCalificador: parseInt(idCalificadorProp),
        idCalificado: decoded.id,
    };
    
    const solicitarReseña = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/resenas",
                solicitudReseña,
                config
            );
            console.log("Reseña pendiente creada con éxito: ", response.data);
        } catch (error) {
            console.error("Error en solicitar la reseña: ", error);
        }
        closeModal(true);
    };

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
                    <p>Se enviará una solicitud de reseña como trabajador. Presione 'OK' para confirmar que usted realizó un trabajo para este usuario</p>
                </div>
                <div className="modal-footer" id="confirmar-resena-footer">
                    <button onClick={() => closeModal(false)} className="boton-cancelar">Cancelar</button>
                    <button onClick={solicitarReseña} className="boton-confirmar">OK</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmacionResena;
