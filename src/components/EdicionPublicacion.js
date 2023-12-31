// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/EdicionPublicacion.css';
// import axios from 'axios';
import ConfirmacionEliminarPublicacion from './ConfirmacionEliminarPublicacion';
import ListaPostulados from './ListaPostulados';


function EdicionPublicacion({idProp}) {

    //Manejo del modal:  confirmar eliminación de una publicación
    const [modalConfirmacionEliminarPublicacion, setModalConfirmacionEliminarPublicacion] = useState(false);
    const abrirModalConfirmacionEliminarPublicacion = () => {
        setModalConfirmacionEliminarPublicacion(true);
    }
    const cerrarModalConfirmacionEliminarPublicacion = () => {
        setModalConfirmacionEliminarPublicacion(false);
        window.location.reload();
    }

    //Manejo del modal: Abrir lista de postulados
    const [modalListaSolicitudes, setModalListaSolicitudes] = useState(false);
    const abrirModalListaSolicitudes = () => {
        setModalListaSolicitudes(true);
    }
    const cerrarModalListaSolicitudes = () => {
        setModalListaSolicitudes(false);
    }

    return (
        <div id='edicion-publicacion'>
            <div className='opcion-publicacion'>
                <FontAwesomeIcon
                    className='icono-opcion-publicacion'
                    id="opcion-publicacion-hand"
                    icon={faHand}
                    onClick={abrirModalListaSolicitudes}
                />
            </div>
            {modalListaSolicitudes && (<ListaPostulados closeModal={cerrarModalListaSolicitudes} idPublicacion={idProp}/>)}
            <div className='opcion-publicacion'>
                <FontAwesomeIcon
                    className='icono-opcion-publicacion'
                    id="opcion-publicacion-trash"
                    icon={faTrash}
                    // onClick={() => eliminarPublicacion()}
                    onClick={abrirModalConfirmacionEliminarPublicacion}
                />
            </div>
            {modalConfirmacionEliminarPublicacion && (<ConfirmacionEliminarPublicacion closeModal={cerrarModalConfirmacionEliminarPublicacion} idPublicacion={idProp}/>)}
        </div>
    )
}

export default EdicionPublicacion;