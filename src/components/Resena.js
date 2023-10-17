import React from 'react';
import "../styles/Resena.css"

function Resena({ resenadorProp, fechaProp, descripcionProp, calificacionProp }) {
    return(
        <article id='contenedor-resena'>
            <div className='resena-header'>
                <p className='resena-nombre-resenador'>{resenadorProp}</p>
                <p className="fecha">{fechaProp}</p>
            </div>
            <div className='resena-content'>
                <p className='resena-descripcion'>{descripcionProp}</p>
                <p className='resena-calificacion'><span>Calificación: </span>{calificacionProp}/5</p>
            </div>
        </article>
    );
};

export default Resena;
