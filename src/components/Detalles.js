import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPhone } from "@fortawesome/free-solid-svg-icons";
import '../styles/Detalles.css';

function Detalles({ closeModal }, props) {
  return (
    <div className="modalBackground">
      <div className="contenedor-modal">
        <div className="modal-header">
          <p>{props.titulo}</p>
          <button id="cerrar-modal" onClick={() => closeModal(false)}>
            <FontAwesomeIcon icon={faXmark} id="close-icon"/>
          </button>
        </div>

        <div className="modal-body">
          <div className="contenedor-detalles">
            <div className="detalles-content">
              <p>{props.descripcion}</p>
            </div>
            <div className="detalles-content">
              <p className="detalles-servicio"><span>Servicio:</span>{props.servicio}</p>
              <p className="detalles-localidad"><span>Localidad:</span>{props.localidad}</p>
            </div>
          </div>
          <div className="contenedor-detalles-perfil">
            <div className="perfil-foto">
              <img alt="foto"/>
            </div>
            <p className="perfil-nombre">{props.nombre}</p>
            <div className="perfil-numero">
              <FontAwesomeIcon icon={faPhone} />
              <p>{props.numero}</p>
            </div>
            <a href="#">Ir al perfil</a>
          </div>
        </div>

        <div className="modal-footer">
            <p id="fecha">{props.fecha}</p>
        </div>
      </div>
    </div>
  );
}

export default Detalles;


{/* 
            <Modal.Header className="modal-header" closeButton>
                <Modal.Title className='modal-title'>Detalles publicación</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">

            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <button onClick={handleClose}>
                Close
                </button>
                <button onClick={handleClose}>
                Save Changes
                </button>
            </Modal.Footer> */}