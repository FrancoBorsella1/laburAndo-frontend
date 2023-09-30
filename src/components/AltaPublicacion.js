import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles/AltaPublicacion.css";
import axios from "axios";
import jwtDecode from "jwt-decode"; //npm install jwt-decode

function AltaPublicacion({ closeModal, onPublicar }) {
  const [servicios, setServicios] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("");

  const [publicacion, setPublicacion] = useState([]);
  const [localidadId, setLocalidadId] = useState(null);
  //descripcion: "",
  //duracionDias: "",
  //fecha: "",
  //titulo: "",
  //idPersona: "",
  //idLocalidad: "",
  //servicio: "",

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/servicio`, config)
      .then((response) => {
        setServicios(response.data.servicios);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:3000/api/provincia`, config)
      .then((response) => {
        setProvincias(response.data.provincias);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleProvinciaChange = (event) => {
    const nuevaProvinciaSeleccionada = event.target.value;
    setProvinciaSeleccionada(nuevaProvinciaSeleccionada);
    console.log("seleccionada: ", nuevaProvinciaSeleccionada);

    axios
      .get(
        `http://localhost:3000/api/localidadesxprovincia/${nuevaProvinciaSeleccionada}`,
        config
      )
      .then((response) => {
        setLocalidades(response.data.localidades);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const persistirPublicacion = async (event) => {
    event.preventDefault();

    //Para persisistir
    const fechaActual = new Date().toLocaleDateString();
    const publicacionPersistir = {
      descripcion: publicacion.descripcion,
      duracionDias: 10,
      fecha: fechaActual,
      titulo: publicacion.titulo,
      idPersona: decoded.id,
      idLocalidad: parseInt(localidadId),
      servicio: servicioSeleccionado,
    };
    console.log("Persistir: ", publicacionPersistir);

    //Fin: para persisistir
    try {
      const response = await axios.post(
        "http://localhost:3000/api/publicacion",
        publicacionPersistir,
        config
      );
      console.log("Publicacion exitosa: ", response.data);
    } catch (error) {
      console.error("No se puede iniciar sesión: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Evitar publicaciones sin titulo o vacías
    if (
      publicacion.titulo == "" ||
      publicacion.contenido == "" ||
      servicioSeleccionado == "" ||
      provinciaSeleccionada == "" ||
      localidadSeleccionada == ""
    ) {
      alert("Por favor, complete todos los campos.");
      console.log("Por favor, complete todos los campos.");
      return;
    }

    const fechaActual = new Date().toLocaleDateString();
    const nuevaPublicacion = {
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      servicio: servicioSeleccionado,
      provincia: provinciaSeleccionada,
      localidad: localidadSeleccionada,
      fecha: fechaActual,
    };

    onPublicar(nuevaPublicacion);

    setPublicacion({
      titulo: "",
      descripcion: "",
      fecha: "",
    });
    setServicioSeleccionado("");
    setProvinciaSeleccionada("");
    setLocalidadSeleccionada("");
    closeModal(true);
  };

  return (
    <div className="modalBackground">
      <div className="contenedor-modal" id="alta-publicacion">
        <div className="modal-header">
          <p>Nueva publicación</p>
          <button id="cerrar-modal" onClick={() => closeModal(false)}>
            <FontAwesomeIcon icon={faXmark} id="close-icon" />
          </button>
        </div>

        <div className="modal-body">
          {/* <div className="alta-publicacion-titulo"> */}
          <input
            id="alta-publicacion-titulo"
            type="text"
            placeholder="Título..."
            value={publicacion.titulo}
            onChange={(e) =>
              setPublicacion({ ...publicacion, titulo: e.target.value })
            }
          />
          {/* </div> */}
          {/* <div className="alta-publicacion-descripcion"> */}
          <textarea
            id="alta-publicacion-descripcion"
            placeholder="Descripción..."
            value={publicacion.contenido}
            onChange={(e) =>
              setPublicacion({ ...publicacion, descripcion: e.target.value })
            }
          />
          {/* </div> */}
        </div>

        <div className="modal-footer">
          <div className="alta-publicacion-opciones">
            <select
              name="Servicio"
              value={servicioSeleccionado}
              onChange={(e) => setServicioSeleccionado(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Servicio
              </option>
              {servicios.map((servicio) => (
                <option key={servicio.id} value={servicio.nombre}>
                  {servicio.nombre}
                </option>
              ))}
            </select>
            <select
              name="Provincia"
              value={provinciaSeleccionada}
              onChange={handleProvinciaChange}
            >
              <option value="" disabled selected hidden>
                Provincia
              </option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.nombre}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
            <select
              name="Localidad"
              value={localidadSeleccionada}
              onChange={(e) => {
                setLocalidadSeleccionada(e.target.value);
                setLocalidadId(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-key"
                  )
                );
              }}
            >
              <option value="" disabled selected hidden>
                Localidad
              </option>
              {localidades.map((localidad) => (
                <option
                  key={localidad.id}
                  value={localidad.nombre}
                  data-key={localidad.id}
                >
                  {localidad.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleSubmit}>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AltaPublicacion;
