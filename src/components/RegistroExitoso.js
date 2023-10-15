import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import '../styles/RegistroExitoso.css';

function RegistroExitoso({nombre}) {
    const navigate = useNavigate();

    return (
        <div className="modalBackground">
        <div className="contenedor-modal" id="registro-exitoso">
            <div className="modal-header">
                <p>Bienvenido a Laburando, {nombre}</p>
                {/* <button id="cerrar-modal" onClick={() => closeModal(false)}>
                    <FontAwesomeIcon icon={faXmark} id="close-icon"/>
                </button> */}
            </div>
            <div className="modal-body">
                <FontAwesomeIcon id="icono-check-registro" icon={faCircleCheck} />
                <h2>Registro exitoso</h2>
                {/* <h6>Bienvenido a Laburando, {usuario.nombre}</h6> */}
                <p>Para iniciar sesión puede utilizar su nombre de usuario o email. 
                    Desde Laburando podrá ver publicaciones donde solicitan servicios como Electricidad, 
                    Plomería, Gas y Limpiaza, puede acceder a cualquier laburo de acuerdo a sus capacidades
                    y contactarse con el contratista a través de los dintintos medios. 
                    Es importante que una vez realizado el trabajo, solicite una reseña para mejorar su puntuación 
                </p>
                <button onClick={()=>{navigate("/"); }}>Continuar e iniciar sesión</button>
            </div>
        </div>
        </div>
    );
}

export default RegistroExitoso;