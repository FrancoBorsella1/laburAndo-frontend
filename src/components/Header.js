import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import axios from 'axios';

function Header({ onAbrirModal }) {
    const [servicios, setServicios] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [selectedProvincia, setSelectedProvincia] = useState(""); 
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        axios.get(`http://localhost:3000/api/servicio`, config)
            .then((response) => {
                setServicios(response.data.servicios);
            })
            .catch((error) => {
                console.error(error);
            });
        axios.get(`http://localhost:3000/api/provincia`, config)
            .then((response) => {
                setProvincias(response.data.provincias);
                console.log("estado:", provincias);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);
    // --------------------------------------------------------------------------------------------
    // Cambios en el select de provincias 1
    // const handleProvinciaChange = (event) => {
    //     const provinciaSeleccionada = event.target.value;
    //     setSelectedProvincia(provinciaSeleccionada);

    //     axios.post(`http://localhost:3000/api/localidadesxprovincia/${provinciaSeleccionada}`, config)
    //         .then((response) => {
    //             setLocalidades(response.data); 
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };
    // Cambios en el select de provincias 2
    const handleProvinciaChange = (event) => {
        const provinciaSeleccionada = event.target.value;
        console.log("seleccionada: ", provinciaSeleccionada);

        const provinciaData = {
            nombreProvincia: provinciaSeleccionada
        };
        console.log("data: ", provinciaData);
        axios.get(`http://localhost:3000/api/localidadesxprovincia?provinciaData=${JSON.stringify(provinciaData)}`, config)
            .then((response) => {
              setLocalidades(response.data); 
              setLocalidades(response.data.localidades); 
              console.log("response: ", response.data.localidades);
              console.log("estado: ", localidades);
            })
            .catch((error) => {
              console.error(error);
            });
    };
    // --------------------------------------------------------------------------------------------








    return(
        <header id="componente-header">
            <div className="contenedor-publicacion">
                <p>¿Estás buscando un servicio?</p>
                <button className="publicacion" onClick={onAbrirModal}>Creá una publicación...</button>
            </div>
            <div className="linea-vertical"></div>
            <div className="contenedor-busqueda">
                <p>¿Estás buscando un trabajo?</p>
                <form className="formulario-busqueda">
                    
                    <select name="Servicio">
                        <option value="" disabled selected hidden>Servicio</option>
                        {servicios.map((servicio) => (
                            <option key={servicio.id} value={servicio.nombre}>
                                {servicio.nombre}
                            </option>
                        ))}                    
                    </select>
                    <select name="Provincia" onChange={handleProvinciaChange} value={selectedProvincia}> 
                        <option value="" disabled selected hidden>Provincia</option>
                        {provincias.map((provincia) => (
                            <option key={provincia.id} value={provincia.nombre}>
                                {provincia.nombre}
                            </option>
                        ))} 
                    </select>
                    <select name="Localidad">
                        <option value="" disabled selected hidden>Localidad</option>
                        <option value="berazategui">Berazategui</option>
                        <option value="berisso">Berisso</option>
                        <option value="la plata">La Plata</option>
                    </select>
                    <button>Buscar</button>
                </form>
            </div>
        </header>
    );
};

export default Header;