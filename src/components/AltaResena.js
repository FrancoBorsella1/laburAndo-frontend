import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles/AltaResena.css";
import "../styles/modal.css";
import jwtDecode from "jwt-decode"; 
import axios from "axios";

function AltaResena({ closeModal }) {

    //Variables de estado para controlar el estado de la reseña
    const [resena, setResena] = useState([]);

    //Variables de estado para almacenar la opción seleccionada 
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState("");

    const persistirResena = async () => {

        //Obtengo token del usuario
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token); //se desestructura el token
        const config = { //token con formato Json
          headers: { Authorization: `Bearer ${token}` } 
        };
        console.log(config.headers.Authorization)

        //Construir objeto que se va a persistir
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
        const dia = fechaActual.getDate().toString().padStart(2, '0'); 
    
        const fechaPublicacionActual = `${año}/${mes}/${dia}`;

        const resenaPersistir = {
            fecha: fechaPublicacionActual,
            calificacion: calificacionSeleccionada,
            idCalificador: decoded.id,
            idCalificado: 1, //Hardcoded
            descripcion: resena.descripcion
        }

        try {
            const response = await axios
            .post(
                "http://localhost:3000/api/resenas",
                resenaPersistir,
                config
            );
            console.log("Reseña persistida correctamente", response.data)
        } catch (error) {
            console.error("Error en el alta de la reseña", error);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            resena.descripcion == "" ||
            calificacionSeleccionada == ""
        ) {
            alert("Por favor, complete todos los campos.");
            return;
        } else {
            persistirResena();
        }

        setResena({
            descripcion: "",
            fecha: "",
        });
        setCalificacionSeleccionada("");
        closeModal(true);
    }

    return(
        <div className="modalBackground">
            <div className="contenedor-modal" id="alta-resena">
                <div className="modal-header">
                    <p>Nueva reseña: Usuario</p>
                    <button id="cerrar-modal" onClick={() => closeModal(false)}>
                        <FontAwesomeIcon icon={faXmark} id="close-icon" />
                    </button>
                </div>

                <div className="modal-body" id="alta-resena-body">
                    <textarea
                        id="alta-resena-descripcion"
                        placeholder="Descripción..."
                        value={resena.descripcion}
                        onChange={(e) =>
                            setResena({...resena, descripcion: e.target.value })
                        }
                    />
                    <div className="alta-resena-opciones">
                        <select
                            name="Calificacion"
                            value={calificacionSeleccionada}
                            onChange={(e) => {
                                setCalificacionSeleccionada(e.target.value);
            
                            }}
                        >
                            <option value="" disabled selected hidden>
                                Calificación
                            </option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button className="alta-resena-boton" type="button" onClick={handleSubmit}>Valorar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AltaResena;