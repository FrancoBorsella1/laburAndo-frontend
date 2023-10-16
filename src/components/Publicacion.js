import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import "../styles/Publicacion.css";

function Publicacion({ idProp, tituloProp, fechaProp, servicioProp, localidadProp, onAmpliar }) {
    const publicacion = {
        titulo: tituloProp,
        fecha: fechaProp,
        servicio: servicioProp,
        localidad: localidadProp,
        id: idProp,
        descripcion: 'Busco plomero para arreglar el flotante de un inodoro roto',
        nombre: 'Franco Borsella',
        numero: '124115124',
    }
    
    return(
        <article id="contenedor-publicacion">
            <div className="publicacion-header">
                <p className="publicacion-titulo">{tituloProp}</p>
                <p className="fecha">{fechaProp}</p>
            </div>
            <div className="publicacion-content">
                <p className="publicacion-servicio"><span>Servicio:</span> {servicioProp}</p>
                <p className="publicacion-localidad"><span>Localidad:</span> {localidadProp}</p>
                <FontAwesomeIcon icon={ faUpRightAndDownLeftFromCenter } id='publicacion-icono' onClick={() => onAmpliar(publicacion)}/>
            </div>
        </article> 
    );
};

export default Publicacion;
