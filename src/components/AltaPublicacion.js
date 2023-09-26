import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../styles/AltaPublicacion.css';

function AltaPublicacion({ closeModal }) {
    return (
        <div className="modalBackground">
            <div className="contenedor-modal" id="alta-publicacion">
                <div className="modal-header">
                    <p>Nueva publicación</p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon"/>
                    </button>
                </div>

                <div className="modal-body">
                    {/* <div className="alta-publicacion-titulo"> */}
                        <input id="alta-publicacion-titulo" type='text' placeholder='Título...'/> 
                    {/* </div> */}
                    {/* <div className="alta-publicacion-descripcion"> */}
                        <textarea id="alta-publicacion-descripcion" placeholder='Descripción...'/> 
                    {/* </div> */}
                </div>

                <div className="modal-footer">
                    <div className="alta-publicacion-opciones">
                        <select name="Servicio">
                            <option value="" disabled selected hidden>Servicio</option>
                            <option value="plomeria">Plomería</option>
                            <option value="electricidad">Electricidad</option>
                            <option value="jardineria">Jardinería</option>
                        </select>
                        <select name="Localidad">
                            <option value="" disabled selected hidden>Localidad</option>
                            <option value="berazategui">Berazategui</option>
                            <option value="berisso">Berisso</option>
                            <option value="la plata">La Plata</option>
                        </select>
                    </div>
                    <button>Publicar</button>
                </div>
            </div>
        </div>
    );
}

export default AltaPublicacion;