import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "../styles/ConfirmacionPostular.css";
import "../styles/modal.css";
import axios from "axios";
import jwtDecode from "jwt-decode"; 


function ConfirmacionPostular({ closeModal, idPublicacion}) {
    
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const decoded = jwtDecode(token);
    const idPostulante = decoded.id;
    
    console.log(config)
    //Petición para asociar a un postulante a una publicación
    const postularmePublicacion = () => {
        console.log("entró a la publicaciom", idPublicacion)
        console.log("entró con el postulante", idPostulante)
        axios
            .post(`http://localhost:3000/api/SolicitudTrabajo/${idPostulante}/${idPublicacion}`, config)
            .then((response) => {
                console.log(response.data);
                closeModal(false);
            })
            .catch((error) => {
                console.error('Error postualrse en la publicación: ', error);
            });
    }

    return(
        <div className="modalBackground">
            <div className="contenedor-modal" id="confirmacion-postular">
                <div className="modal-header">
                    <p>Confirmar postulación</p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon" />
                    </button>
                </div>
                <div className="modal-body" >
                    <p>Te estás postulando al laburo seleccionado, 
                        el empleador sabrá que te interesa y podrá contactarte. LaburAndo
                        te desea lo mejor.</p>
                    <small>Recordá que mientras mejor trabajes, mayor será tu puntuación.
                        ¡Al finalizar tus tareas, pedí una reseña!</small>
                </div>
                <div className="modal-footer">
                    <button onClick={() => closeModal(false)} className="boton-cancelar">Cancelar</button>
                    <button onClick={() => postularmePublicacion()} className="boton-confirmar">Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmacionPostular;
