import { useNavigate } from 'react-router-dom';
import '../styles/BuscarUsuario.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode"; //npm install jwt-decode
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function BuscarUsuario({closeModal}) {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const idLogeado = decoded.id;
    const navigate = useNavigate();
    const config = { headers: { Authorization: `Bearer ${token}` } };


    const [usuario, setUsuario] = useState(null);
    const [telefonoIngresado, setTelefonoIngresado] = useState("");
   
    // almacenar en telefonoIngresado el texcto ingresado en el input
    const handleInputChange = (event) => {
        const value = event.target.value;
        setTelefonoIngresado(value);
    };
    console.log("telefono: ", telefonoIngresado)

    const buscarIdUsuario = (tel) => {
        // petición para traer un usuario por telefono
        axios
        .get(`http://localhost:3000/api/usuario/telefono/${tel}`, config)
        .then((response) => {
            setUsuario(response.data.id);
            console.log("usuario petición: ", response.data.id);
            navigate(response.data.id === idLogeado ? `/Perfil` : `/PerfilVisitado/${response.data.id}`);
        })
        .catch((error) => {
            console.error(error.response.data.message);
            alert(error.response.data.message);
            
        });
    }
    

    return (
        <div className="modalBackground">
          <div className="contenedor-modal" id="buscar-usuario">
              <div className="modal-header">
                  <p>Buscar usuario</p>
                  <button id="cerrar-modal" onClick={() => closeModal(false)}>
                    <FontAwesomeIcon icon={faXmark} id="close-icon" />
                  </button>
              </div>
              <div className="modal-body">
                  <h4>
                    Ingresá el número de teléfono de la persona a la que deseas buscar.
                  </h4>
                  <div className='modal-opciones'>
                    <input 
                            type='text' 
                            name="telefono" 
                            placeholder='Ingrese un telefono'
                            value={telefonoIngresado}
                            onChange={handleInputChange}    
                        />                  
                    <button onClick={ () => buscarIdUsuario(telefonoIngresado) } >Buscar</button>
                  </div>
              </div>
          </div>
        </div>
    );
}

export default BuscarUsuario;   