import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import "../styles/Publicacion.css";

function Publicacion() {
    return(
        <article id="contenedor-publicacion">
            <div className="publicacion-header">
                <p className="publicacion-titulo">Titulo</p>
                <p className="fecha">XX/XX/2XXX</p>
            </div>
            <div className="publicacion-content">
                <p className="publicacion-servicio"><span>Servicio:</span> servicio</p>
                <p className="publicacion-localidad"><span>Localidad:</span> localidad</p>
                <FontAwesomeIcon icon={ faUpRightAndDownLeftFromCenter } id='publicacion-icono'/>
            </div>
        </article> 
    );
};

export default Publicacion;
