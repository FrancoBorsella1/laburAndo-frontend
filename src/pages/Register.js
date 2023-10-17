import React, { useState, useEffect } from 'react';
import logo from "../assets/logos/logo-original.png";
import "../styles/Register.css"
import Footer from '../components/Footer';
import RegistroExitoso from '../components/RegistroExitoso';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [servicios, setServicios] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
  

    //Peticiones GET al servidor
    useEffect(() => {
        axios
          .get(`http://200.58.106.151:3000/api/servicio`, config)
          .then((response) => {
            setServicios(response.data.servicios);
          })
          .catch((error) => {
            console.error(error);
          });
        axios
          .get(`http://200.58.106.151:3000/api/provincia`, config)
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
        axios
          .get(
            `http://200.58.106.151:3000/api/localidadesxprovincia/${nuevaProvinciaSeleccionada}`,
            config
          )
          .then((response) => {
            setLocalidades(response.data.localidades);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    //Fin: peticiones GET al servidor

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    //Validaciones por tabs
    const [tabActiva, setTabActiva] = useState(1);
    const handleTabChange = (tab) => {
        setTabActiva(tab);
    };
    const [erroresTab1, setErroresTab1] = useState({
        email: '',
        usuario: '',
        clave: '',
        repclave: '',
    });
    function validarTab1() { /*email, usuario, contraseña*/
        let erroresEncontrados = false;
        const nuevosErroresTab1 = {
            email: '',
            usuario: '',
            clave: '',
            repclave: '',
        };
        
            //Validar que el correo electrónico no esté vacío y tenga el formato adecuado
            if (!usuario.email) {
                nuevosErroresTab1.email = 'Debe ingresar un correo electrónico';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!usuario.email.match(emailRegex)) {
                nuevosErroresTab1.email = 'Ingrese un correo electrónico válido';
                erroresEncontrados = true;
            }
            //Validación usuario
            if (!usuario.usuario) {
                nuevosErroresTab1.usuario = 'Debe ingresar un nombre de usuario'
                erroresEncontrados = true;
            }
            //Validación contrasenia
            if (usuario.clave.length < 4) {
                nuevosErroresTab1.clave = 'La contraseña debe tener al menos 4 caracteres';
                erroresEncontrados = true;
            }
            if (usuario.clave && !usuario.repclave) {
                nuevosErroresTab1.repclave = 'Las contraseñas no coinciden';
                erroresEncontrados = true;
            }
            if (usuario.clave && usuario.repclave && usuario.clave !== usuario.repclave) {
                nuevosErroresTab1.repclave = 'Las contraseñas no coinciden'
                erroresEncontrados = true;
            }

        setErroresTab1(nuevosErroresTab1);
        return erroresEncontrados;
    }
    const [erroresTab2, setErroresTab2] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
    });
    function validarTab2() { /*nombre, apellido, telefono*/
        //Validaciones
        let erroresEncontrados = false;
        let nuevosErrores = {
            nombre: '',
            apellido: '',
            telefono: '',
        };
            if (!usuario.nombre) {
                nuevosErrores.nombre = 'Debe ingresar un nombre';
                erroresEncontrados = true;
            }
            if (!usuario.apellido) {
                nuevosErrores.apellido = 'Debe ingresar un apellido';
                erroresEncontrados = true;
            }
            if (!usuario.telefono) {
                nuevosErrores.telefono = 'Debe ingresar un número de teléfono';
                erroresEncontrados = true;
            }
            if (isNaN(usuario.telefono)) {
                nuevosErrores.telefono = 'El teléfono debe tener un valor numérico';
                erroresEncontrados = true;
            }
        setErroresTab2(nuevosErrores);
        return erroresEncontrados;
    }
    const [erroresTab3, setErroresTab3] = useState({
        servicio: '',
        provincia: '',
        localidad: '',
    });
    function validarTab3() { /*servicio, provincia, localidad*/
        let erroresEncontrados = false;
        let nuevosErrores = {
            servicio: '',
            provincia: '',
            localidad: '',
        };
            if (usuario.servicio == 'Servicio') {
                nuevosErrores.servicio = 'Debe seleccionar un servicio'
                erroresEncontrados = true;
            }
            if (usuario.provincia == 'Provincia') {
                nuevosErrores.provincia = 'Debe seleccionar una provincia'
                erroresEncontrados = true;
            }
            if (usuario.idLocalidad == 'Localidad') {
                nuevosErrores.localidad = 'Debe seleccionar una localidad'
                erroresEncontrados = true;
            }
        setErroresTab3(nuevosErrores);
        return erroresEncontrados;
    }
    //FIN: validaciones por tabs

    //OPeticiones POST
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        clave: '',
        repclave: '',
        usuario: '',
        servicios: [],
        idLocalidad: null,
        descripcion: null,
        imagenAdjunta: null,
    });
    const agregarUsuario = async (event) => {
        event.preventDefault();
        console.log("usuario a agregar:", usuario)

        if (validarTab3()) {
            return;
        }
        try{
            const response = await axios.post('http://200.58.106.151:3000/api/usuario', usuario);
            console.log('Usuario registrado exitosamente: ', response.data);
            abrirModal();
        } catch (error) {
            console.error('Error al registrar usuario: ', error);
        }
    };
 

    //Manejo del modal confirmación
    const [modalAbierto, setModalAbierto] = useState(false);

    const abrirModal = () => {
        setModalAbierto(true);
    };



    //página de registro
    return (
        <div>
            <main id="contenedor-registro">
                <div className='contenedor-logo'>
                    <img src={logo} alt='Logo' className='logo-grande'></img>
                    <h1>Tu próximo laburo está a un click de distancia.</h1>
                </div>
                <form className='formulario-registro' onSubmit={agregarUsuario}>
                    <div className='contenedor-inputs'>
                        {tabActiva === 1 && (
                            <>
                                <h2>Registro</h2>
                                <small>Ingrese sus datos de acceso: </small>
                                <input 
                                    type='text' 
                                    name="usuario" 
                                    placeholder='Nombre de usuario'
                                    value={usuario.usuario}
                                    onChange={handleInputChange}
                                />
                                {erroresTab1.usuario && <p className='error'>{erroresTab1.usuario}</p>}
                                <input 
                                    type='text' 
                                    name="email" 
                                    placeholder='Correo electrónico'
                                    value={usuario.email}
                                    onChange={handleInputChange}
                                />
                                {erroresTab1.email && <p className='error'>{erroresTab1.email}</p>}
                                <input 
                                    type='password' 
                                    name="clave" 
                                    placeholder='Contraseña'
                                    value={usuario.clave}
                                    onChange={handleInputChange}
                                />
                                {erroresTab1.clave && <p className='error'>{erroresTab1.clave}</p>}
                                <input 
                                    type='password' 
                                    name="repclave" 
                                    placeholder='Repetir contraseña'
                                    value={usuario.repclave}
                                    onChange={handleInputChange}
                                /> 
                                {erroresTab1.repclave && <p className='error'>{erroresTab1.repclave}</p>}
                                <button className='boton-superior-aux' type="button"  onClick={() => {
                                    if (!validarTab1()) {
                                        handleTabChange(2);
                                    }
                                }}>
                                    Continuar
                                </button>
                            </>
                        )}
                        {tabActiva === 2 && (
                            <>
                                <h2>Registro</h2>
                                <small>Ingrese sus información de contacto: </small>
                                <input
                                    type='text'
                                    name='nombre'
                                    placeholder='Nombre'
                                    value={usuario.nombre}
                                    onChange={handleInputChange}
                                />
                                {erroresTab2.nombre && <p className='error'>{erroresTab2.nombre}</p>}
                                <input
                                    type='text'
                                    name='apellido'
                                    placeholder='Apellido'
                                    value={usuario.apellido}
                                    onChange={handleInputChange}
                                />
                                {erroresTab2.apellido && <p className='error'>{erroresTab2.apellido}</p>}
                                <input 
                                    type='text' 
                                    name="telefono" 
                                    placeholder='Telefono'
                                    value={usuario.telefono}
                                    onChange={handleInputChange}    
                                />
                                {erroresTab2.telefono && <p className='error'>{erroresTab2.telefono}</p>}
                                <button className='boton-superior-aux' id='boton-atras' type='button' onClick={() => handleTabChange(1)}>Atrás</button>

                                <button type="button" onClick={() => {
                                    if (!validarTab2()) {
                                        handleTabChange(3);
                                    }
                                }}>
                                    Continuar
                                </button>
                            </>  
                        )}
                        {tabActiva === 3 && (
                            <>
                                <h2>Registro</h2>
                                <small>Para personalizar su búsqueda: </small>
                                <select 
                                    name="Servicio" 
                                    onChange={(e) => setUsuario({...usuario, servicios: e.target.value})}
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

                                {erroresTab3.servicio && <p className='error'>{erroresTab3.servicio}</p>}

                                <select
                                    name="Provincia"
                                    onChange={handleProvinciaChange}
                                    value={provinciaSeleccionada}
                                >
                                    <option value="" disabled selected hidden> Provincia </option>
                                    {provincias.map((provincia) => (
                                    <option key={provincia.id} value={provincia.nombre}>
                                        {provincia.nombre}
                                    </option>
                                    ))}
                                </select>
                                {erroresTab3.provincia && <p className='error'>{erroresTab3.provincia}</p>}

                                <select name="Localidad" onChange={(e) => setUsuario({ ...usuario, idLocalidad: e.target.value })}>
                                    <option value="" disabled selected hidden> Localidad </option>
                                    {localidades.map((localidad) => (
                                        <option key={localidad.id} value={localidad.id}>
                                        {localidad.nombre}
                                    </option>
                                    ))}
                                </select>

                                {erroresTab3.localidad && <p className='error'>{erroresTab3.localidad}</p>}
                                <button className='boton-superior-aux' id='boton-atras' type='button' onClick={() => handleTabChange(2)}>Atrás</button>
                                <button type='submit'>Registrarse</button>
                                {modalAbierto && (<RegistroExitoso nombre={ (usuario.nombre).toUpperCase()}/>)}
                            </>  
                        )}
                        <div className='linea-horizontal'></div>
                    </div>
                    <div className='contenedor-links'>
                        <Link to="/">¿Ya tenés una cuenta? Iniciar sesión</Link>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    );
};

export default Register;