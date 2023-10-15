import React from 'react';
import "../styles/Resena.css"

function Resena({ resena }) {
    return(
        <article id='contenedor-resena'>
            <div className='resena-header'>
                <p className='resena-nombre-resenador'>Franco Borsella</p>
                <p className="fecha">15/10/2023</p>
            </div>
            <div className='resena-content'>
                <p className='resena-descripcion'>Hola esto es una reseñaas ashdkfhasdkjfhkadjshf asdkfjhadjsf hasdkjfkasd kfhadsk fh kasdhfkajhsdfhkajdshf kahs hasdfjkhadsfh kajsdhfkjahsdjkfhaksdfh kjasdhfkj akdjsfhjkasdh fkjadshfjk ajkdsh kahsdkfj akdsfkj ashdkjf hkadkf kajsdh fkasdhf adksfh kajdshfkadsj </p>
                <p className='resena-calificacion'><span>Calificación: </span>5/5</p>
            </div>
        </article>
    );
};

export default Resena;
