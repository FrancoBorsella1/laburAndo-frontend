import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";

function Header({ onAbrirModal }) {
  const [servicios, setServicios] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const token = localStorage.getItem("token");
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

  // --------------------------------------------------------------------------------------------

  return (
    <header id="componente-header">
      <div className="contenedor-publicacion">
        <p>¿Estás buscando un servicio?</p>
        <button className="publicacion" onClick={onAbrirModal}>
          Creá una publicación...
        </button>
      </div>
      <div className="linea-vertical"></div>
      <div className="contenedor-busqueda">
        <p>¿Estás buscando un trabajo?</p>
        <form className="formulario-busqueda">
          <select name="Servicio">
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
            onChange={handleProvinciaChange}
            value={provinciaSeleccionada}
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
          <select name="Localidad">
            <option value="" disabled selected hidden>
              Localidad
            </option>
            {localidades.map((localidad) => (
              <option key={localidad.id} value={localidad.nombre}>
                {localidad.nombre}
              </option>
            ))}
          </select>
          <button>Buscar</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
