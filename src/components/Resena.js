import React from 'react';
import "../styles/Resena.css"

function Resena({ resenadorProp, fechaProp, descripcionProp, calificacionProp }) {
    const fecha = new Date(fechaProp);
    const fechaConvertida = fecha.toLocaleDateString();
    return(
        <article id='contenedor-resena'>
            <div className='resena-header'>
                <p className='resena-nombre-resenador'>{resenadorProp}</p>
                <p className="fecha">{fechaConvertida}</p>
            </div>
            <div className='resena-content'>
                <p className='resena-descripcion'>{descripcionProp}</p>
                <p className='resena-calificacion'><span>Calificación: </span>{calificacionProp}/5</p>
            </div>
        </article>
    );
};

export default Resena;
