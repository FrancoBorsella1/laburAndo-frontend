import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPhone } from "@fortawesome/free-solid-svg-icons";
import '../styles/Detalles.css';

function Detalles({ closeModal, idProp }) {

console.log ("id de la publicacion: ",idProp)
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [publicacionDetalles, setPublicacionDetalles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/publicacion/${idProp}`, config)
      .then((response) => {
        setPublicacionDetalles(response.data.servicios);
        console.log("detalles: ", response.data.servicios); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className="modalBackground">
      <div className="contenedor-modal" id="detalles-publicacion">
        <div className="modal-header">
          {/* <p>{publicacion.titulo}</p> */}
          <p>titulo</p>
          <button id="cerrar-modal" onClick={() => closeModal(false)}>
            <FontAwesomeIcon icon={faXmark} id="close-icon"/>
          </button>
        </div>

        <div className="modal-body">
          <div className="contenedor-detalles">
            <div className="detalles-content">
              {/* <p>{publicacion.descripcion}</p> */}
              <p>descripcion</p>
            </div>
            <div className="detalles-content">
              {/* <p className="detalles-servicio"><span>Servicio: </span>{publicacion.servicio}</p> */}
              <p className="detalles-servicio"><span>Servicio: </span>servicio</p>
              <p className="detalles-localidad"><span>Localidad: </span>localidad</p>
              {/* <p className="detalles-localidad"><span>Localidad: </span>{publicacion.localidad}</p> */}

            </div>
          </div>
          <div className="contenedor-detalles-perfil">
            <div className="perfil-foto">
              <img alt="foto"/>
            </div>
            {/* <p className="perfil-nombre">{publicacion.nombre}</p> */}
            <p className="perfil-nombre">nombre</p>
            <div className="perfil-numero">
              <FontAwesomeIcon icon={faPhone} />
              {/* <p>{publicacion.numero}</p> */}
              <p>numero</p>
            </div>
            <a href="#">Ir al perfil</a>
          </div>
        </div>

        <div className="modal-footer">
            {/* <p id="fecha-publicacion">{publicacion.fecha}</p> */}
            <p id="fecha-publicacion">fecha</p>
        </div>
      </div>
    </div>
  );
}

export default Detalles;