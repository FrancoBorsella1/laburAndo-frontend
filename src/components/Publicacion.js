import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import "../styles/Publicacion.css";

function Publicacion(props) {
    return(
        <article id="contenedor-publicacion">
            <div className="publicacion-header">
                <p className="publicacion-titulo">{props.titulo}</p>
                <p className="fecha">{props.fecha}</p>
            </div>
            <div className="publicacion-content">
                <p className="publicacion-servicio"><span>Servicio:</span> {props.servicio}</p>
                <p className="publicacion-localidad"><span>Localidad:</span> {props.localidad}</p>
                <FontAwesomeIcon icon={ faUpRightAndDownLeftFromCenter } id='publicacion-icono'/>
            </div>
        </article> 
    );
};

export default Publicacion;
