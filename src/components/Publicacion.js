import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faBroom, faFire, faFaucetDrip,faUpRightAndDownLeftFromCenter  } from "@fortawesome/free-solid-svg-icons";
import "../styles/Publicacion.css";

function Publicacion({ idProp, tituloProp, fechaProp, servicioProp, localidadProp, onAmpliar }) {
    const fecha = new Date(fechaProp);
    const fechaConvertida = fecha.toLocaleDateString();


    let iconoSeleccionado;

    if (servicioProp === 'Limpieza') {
        iconoSeleccionado = faBroom;
    } else if (servicioProp === 'Electricidad') {
        iconoSeleccionado = faBolt;
    } else if (servicioProp === 'Plomeria') {
        iconoSeleccionado = faFaucetDrip;
    } else if (servicioProp === 'Gas') {
        iconoSeleccionado = faFire;
    } else {
        iconoSeleccionado = faBolt;
    }

    return(
        <article id="contenedor-publicacion">
            <div className="publicacion-header"
                    id={`publicacion-${servicioProp}`}
            >
                <p className="publicacion-titulo">{tituloProp}</p>
                <p className="fecha">{fechaConvertida}</p>
            </div>
            <div className="publicacion-tarjeta">
                <div className='publicacion-contenedor-icono'>
                    <FontAwesomeIcon icon={ iconoSeleccionado }
                        className='publicacion-icono-servicio'
                        id={`icono-${servicioProp}`}
                    />
                </div>
                <div className='publicacion-content'>
                    <p className="publicacion-servicio"><span>Servicio:</span> {servicioProp}</p>
                    <p className="publicacion-localidad"><span>Localidad:</span> {localidadProp}</p>
                </div>
                <div className='contenedor-icono-abrirdetalles'>
                    <FontAwesomeIcon icon={ faUpRightAndDownLeftFromCenter } id='publicacion-icono' onClick={() => onAmpliar(idProp)}/>
                </div>
            </div>
        </article> 
    );
};

export default Publicacion;
