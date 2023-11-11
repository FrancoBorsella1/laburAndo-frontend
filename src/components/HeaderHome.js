import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";
import axios from "axios";

function HeaderHome({ onCambioFiltro }) {
  const [servicios, setServicios] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("");
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

  const handleServicioChange = (event) => {
    const nuevoServicioSeleccionado = event.target.value;
    setServicioSeleccionado(nuevoServicioSeleccionado);
    console.log(" servicio seleccionado: ", nuevoServicioSeleccionado);
  }

  const handleLocalidadChange = (event) => {
    const nuevaLocalidadSeleccionada = event.target.value;
    setLocalidadSeleccionada(nuevaLocalidadSeleccionada);
  }

  const handleEnviarFiltros = (event) => {
    event.preventDefault();
    const filtros = {
      servicio: servicioSeleccionado,
      localidad: localidadSeleccionada,
    }
    onCambioFiltro(filtros);
  }

  //Recargar página para limpiar los filtros
  function recargarPagina() {
    window.location.reload();
  }

  // --------------------------------------------------------------------------------------------

  return (
    <header id="componente-header">
      <div className="contenedor-busqueda">
        <p>Encontrá tu próximo laburo</p>
        <form className="formulario-busqueda" onSubmit={handleEnviarFiltros}>
          <select 
            name="Servicio"
            onChange={handleServicioChange}
            value={servicioSeleccionado}
          >
            <option value="" disabled selected hidden>
              Servicio
            </option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
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
          <select 
            name="Localidad"
            onChange={handleLocalidadChange}
            value={localidadSeleccionada}
          >
            <option value="" disabled selected hidden>
              Localidad
            </option>
            {localidades.map((localidad) => (
              <option key={localidad.id} value={localidad.id}>
                {localidad.nombre}
              </option>
            ))}
          </select>
          <button type="submit">Buscar</button>
          <button id="boton-recargar" type="button" onClick={recargarPagina}>
            <FontAwesomeIcon
              icon={faRotateRight}
            />
          </button>
        </form>
      </div>
    </header>
  );
}

export default HeaderHome;
