// import React, { useState, useEffect } from 'react';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/EdicionPublicacion.css';

function EdicionPublicacion() {
    return (
        <div id='edicion-publicacion'>
            <div className='opcion-publicacion'>
                <FontAwesomeIcon
                    className='icono-opcion-publicacion'
                    icon={faTrash}
                />
            </div>
            <div className='opcion-publicacion'>
                <FontAwesomeIcon
                    className='icono-opcion-publicacion'
                    icon={faTrash}
                />
            </div>
        </div>
    )
}

export default EdicionPublicacion;