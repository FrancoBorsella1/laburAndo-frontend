import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import "../styles/Publicacion.css";

function Publicacion({ publicacion, onAmpliar }) {
    return(
        <article id="contenedor-publicacion">
            <div className="publicacion-header">
                <p className="publicacion-titulo">{publicacion.titulo}</p>
                <p className="fecha">{publicacion.fecha}</p>
            </div>
            <div className="publicacion-content">
                <p className="publicacion-servicio"><span>Servicio:</span> {publicacion.servicio}</p>
                <p className="publicacion-localidad"><span>Localidad:</span> {publicacion.localidad}</p>
                <FontAwesomeIcon icon={ faUpRightAndDownLeftFromCenter } id='publicacion-icono' onClick={() => onAmpliar(publicacion)}/>
            </div>
        </article> 
    );
};

export default Publicacion;
