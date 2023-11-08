import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "../styles/ConfirmacionEliminarPublicacion.css";
import "../styles/modal.css";
import axios from "axios";

function ConfirmacionEliminarPublicacion({ closeModal, idPublicacion }) {

    //Petición para eliminar una publicación
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log("entró a la publica", idPublicacion)
    const eliminarPublicacion = () => {
        axios
            .delete(`http://localhost:3000/api/publicacion/${idPublicacion}`, config)
            .then((response) => {
                console.log(response.data);
                closeModal(false);
            }).catch((error) => {
                console.error('Error al eliminar publicación: ', error);
            });
    }

    return(
        <div className="modalBackground">
            <div className="contenedor-modal" id="confirmacion-eliminar-publicacion">
                <div className="modal-header">
                    <p>Eliminar publicación </p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon" />
                    </button>
                </div>
                <div className="modal-body" id="confirmar-eliminar-publicacion-body">
                    <FontAwesomeIcon icon={faExclamationTriangle} 
                                     id="exclamation-icon" />
                    <p>Se eliminará la publicación seleccionada y ya no podrá recibir solicitudes de empleo sobre la misma ¿está seguro? </p>
                </div>
                <div className="modal-footer">
                    <button onClick={() => closeModal(false)} className="boton-cancelar">Cancelar</button>
                    <button onClick={() => eliminarPublicacion()} className="boton-confirmar">Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmacionEliminarPublicacion;
