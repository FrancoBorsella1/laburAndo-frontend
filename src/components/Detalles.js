import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPhone } from "@fortawesome/free-solid-svg-icons";
import '../styles/Detalles.css';
import jwtDecode from "jwt-decode"; //npm install jwt-decode

function Detalles({ closeModal, idProp }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [publicacionDetalles, setPublicacionDetalles] = useState([]);
  const decoded = jwtDecode(token);
  const idLogeado = decoded.id;

  useEffect(() => {
    axios.get(`http://localhost:3000/api/publicacion/${idProp}`, config)
      .then((response) => {
        setPublicacionDetalles(response.data.publicacion);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  let fecha = '';
  let fechaConvertida = '';

  if (publicacionDetalles.fechaPublicacion){
    fecha = new Date(publicacionDetalles.fechaPublicacion);
    fechaConvertida = fecha.toLocaleDateString();
  }

  let idContratista = '';
  if (publicacionDetalles && publicacionDetalles.persona){
    idContratista = publicacionDetalles.persona.id;
  }else{
    idContratista = 1;
  }
  console.log("prueba id:",idContratista)

  return (
    <div className="modalBackground">
      <div className="contenedor-modal" id="detalles-publicacion">
        <div className="modal-header">
          <p>{publicacionDetalles.titulo ? publicacionDetalles.titulo: "cargando..." }</p>
          <button id="cerrar-modal" onClick={() => closeModal(false)}>
            <FontAwesomeIcon icon={faXmark} id="close-icon"/>
          </button>
        </div>

        <div className="modal-body">
          <div className="contenedor-detalles">
            <div className="detalles-content">
              <p>{publicacionDetalles.descripcion ? publicacionDetalles.descripcion: "[sin descripción]"}</p>
            </div>
            <div className="detalles-content">
              <p className="detalles-servicio"><span>Servicio: </span>{publicacionDetalles.servicio ? (publicacionDetalles.servicio.nombre ? publicacionDetalles.servicio.nombre : "cargando...") : "cargando..." }</p>
              <p className="detalles-localidad"><span>Localidad: </span>{publicacionDetalles.localidad ? (publicacionDetalles.localidad.nombre ? publicacionDetalles.localidad.nombre : "cargando...") : "cargando..." }</p>

            </div>
          </div>
          <div className="contenedor-detalles-perfil">
            <div className="perfil-foto">
              <img alt="foto"/>
            </div>
            <p className="perfil-nombre">{publicacionDetalles.persona ? publicacionDetalles.persona.nombre: "cargando..."} </p>
            <div className="perfil-numero">
              <FontAwesomeIcon icon={faPhone} />
              <p>{publicacionDetalles.persona ? publicacionDetalles.persona.telefono: "cargando..." }</p>
            </div>
            <button onClick={()=>{idContratista == idLogeado ? navigate(`/Perfil`):navigate(`/PerfilVisitado/${idContratista}`)}}>Ir al perfil</button>
          </div>
        </div>

        <div className="modal-footer">
            <p id="fecha-publicacion">{fechaConvertida ? fechaConvertida: "cargando..."}</p>
        </div>
      </div>
    </div>
  );
}

export default Detalles;