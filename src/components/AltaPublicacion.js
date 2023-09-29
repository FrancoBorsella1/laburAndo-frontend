import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../styles/AltaPublicacion.css';

function AltaPublicacion({ closeModal, onPublicar }) {
    const [publicacion, setPublicacion] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
    });

    const [selectedServicio, setSelectedServicio] = useState('');
    const [selectedProvincia, setSelectedProvincia] = useState('');
    const [selectedLocalidad, setSelectedLocalidad] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //Evitar publicaciones sin titulo o vacías
        if (
            publicacion.titulo == '' ||
            publicacion.contenido == '' ||
            selectedServicio == '' ||
            selectedProvincia == '' ||
            selectedLocalidad == ''
        ) {
            console.error('Por favor, complete todos los campos.')
            return;
        } 
            
        const fechaActual = new Date().toLocaleDateString();
            
        const nuevaPublicacion = {
            titulo: publicacion.titulo,
            descripcion: publicacion.descripcion,
            servicio: selectedServicio,
            provincia: selectedProvincia,
            localidad: selectedLocalidad,
            fecha: fechaActual,
        };

        onPublicar(nuevaPublicacion);

        setPublicacion({
            titulo: '',
            descripcion: '',
            fecha: '',
        });
        setSelectedServicio('');
        setSelectedProvincia('');
        setSelectedLocalidad('');
        closeModal(true);     
    };
    
    return (
        <div className="modalBackground">
            <div className="contenedor-modal" id="alta-publicacion">
                <div className="modal-header">
                    <p>Nueva publicación</p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon"/>
                    </button>
                </div>

                <div className="modal-body">
                    {/* <div className="alta-publicacion-titulo"> */}
                        <input
                            id="alta-publicacion-titulo" 
                            type='text' 
                            placeholder='Título...'
                            value={publicacion.titulo}
                            onChange={(e) => setPublicacion({...publicacion, titulo: e.target.value })}
                        /> 
                    {/* </div> */}
                    {/* <div className="alta-publicacion-descripcion"> */}
                        <textarea 
                            id="alta-publicacion-descripcion" 
                            placeholder='Descripción...'
                            value={publicacion.contenido}
                            onChange={(e) => setPublicacion({...publicacion, descripcion: e.target.value })}
                        /> 
                    {/* </div> */}
                </div>

                <div className="modal-footer">
                    <div className="alta-publicacion-opciones">
                        <select
                            name="Servicio"
                            value={selectedServicio}
                            onChange={(e) => setSelectedServicio(e.target.value)}
                        >
                            <option value="" disabled selected hidden>Servicio</option>
                            <option value="plomeria">Plomería</option>
                            <option value="electricidad">Electricidad</option>
                            <option value="jardineria">Jardinería</option>
                        </select>
                        <select 
                            name="Provincia"
                            value={selectedProvincia}
                            onChange={(e) => setSelectedProvincia(e.target.value)}
                        >
                            <option value="" disabled selected hidden>Provincia</option>
                            <option value="buenosaires">Buenos Aires</option>
                            <option value="cordoba">Córdoba</option>
                            <option value="neuquen">Neuquén</option>
                        </select>
                        <select 
                            name="Localidad"
                            value={selectedLocalidad}
                            onChange={(e) => setSelectedLocalidad(e.target.value)}
                        >
                            <option value="" disabled selected hidden>Localidad</option>
                            <option value="berazategui">Berazategui</option>
                            <option value="berisso">Berisso</option>
                            <option value="la plata">La Plata</option>
                        </select>
                    </div>
                    <button type="button" onClick={handleSubmit}>Publicar</button>
                </div>
            </div>
        </div>
    );
}

export default AltaPublicacion;