import React, { useState } from 'react';
import logo from "../assets/logos/logo-original.png";
import "../styles/Register.css"
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    //Definir estado para los datos del formulario
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        clave: '',
        usuario: '',
        idLocalidad: 1, //Por defecto, cambiar más adelante
    });

    const [errores, seterrores] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        clave: '',
        usuario: '',
        idLocalidad: '', 
    });

    //Manejar cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    //Manejar envio del formulario
    const agregarUsuario = async (event) => {
        event.preventDefault();

        //Validaciones
        let erroresEncontrados = false;
        const nuevosErrores = {
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            clave: '',
            usuario: '',
        };

        //Validar que el nombre no esté vacío
        if (!usuario.nombre) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
            erroresEncontrados = true;
        }

        //Validar que el apellido no esté vacío
        if (!usuario.apellido) {
            nuevosErrores.apellido = 'El apellido es obligatorio';
            erroresEncontrados = true;
        }

        //Validar que el correo electrónico no esté vacío y tenga el formato adecuado
        if (!usuario.email) {
            nuevosErrores.email = 'El correo electrónico es obligatorio';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!usuario.email.match(emailRegex)) {
            nuevosErrores.email = 'Ingrese un correo electrónico válido';
            erroresEncontrados = true;
        }

        //Validar que el telefono no esté vacío y no hayan caracteres
        if (!usuario.telefono) {
            nuevosErrores.telefono = 'El teléfono es obligatorio';
            erroresEncontrados = true;
        }

        if (isNaN(usuario.telefono)) {
            nuevosErrores.telefono = 'El teléfono debe tener un valor numérico';
            erroresEncontrados = true;
        }

        //Validar que la contraseña tenga al menos 4 caracteres
        if (usuario.clave.length < 4) {
            nuevosErrores.clave = 'La contraseña debe tener al menos 4 caracteres';
            erroresEncontrados = true;
        }

        //Validar que el usuario no esté vacío
        if (!usuario.usuario) {
            nuevosErrores.usuario = 'El usuario es obligatorio'
            erroresEncontrados = true;
        }

        if (erroresEncontrados) {
            seterrores(nuevosErrores);
            return; //Si hay errores no se envía el formulario
        }

        try{
            //Realizar la solicitud POST al servidor
            const response = await axios.post('http://localhost:3000/api/usuario', usuario);

            //Manejar la respuesta del servidor
            console.log('Usuario registrado exitosamente: ', response.data);
        } catch (error) {
            //Manejar errores
            console.error('Error al registrar usuario: ', error);
        }
    };

    return (
        <div>
            <main id="contenedor-registro">
                <div className='contenedor-logo'>
                    <img src={logo} alt='Logo' className='logo-grande'></img>
                    <h1>Tu próximo laburo está a un click de distancia.</h1>
                </div>

                <form className='formulario-registro' onSubmit={agregarUsuario}>
                    <h2>Registro</h2>
                    <div className='contenedor-inputs'>
                        <input 
                            type='text' 
                            name="nombre" 
                            placeholder='Nombre'
                            value={usuario.nombre}
                            onChange={handleInputChange}
                            
                        />
                        {errores.nombre && <p className='error'>{errores.nombre}</p>}
                        <input 
                            type='text' 
                            name="apellido" 
                            placeholder='Apellido'
                            value={usuario.apellido}
                            onChange={handleInputChange}
                            
                        />
                        {errores.apellido && <p className='error'>{errores.apellido}</p>}
                        <input 
                            type='text' 
                            name="email" 
                            placeholder='Correo electrónico'
                            value={usuario.email}
                            onChange={handleInputChange}
                            
                        />
                        {errores.email && <p className='error'>{errores.email}</p>}
                        <input 
                            type='text' 
                            name="usuario" 
                            placeholder='Nombre de usuario'
                            value={usuario.usuario}
                            onChange={handleInputChange}
                            
                        />
                        {errores.usuario && <p className='error'>{errores.usuario}</p>}
                        <input 
                            type='text' 
                            name="telefono" 
                            placeholder='Telefono'
                            value={usuario.telefono}
                            onChange={handleInputChange}
                            
                        />
                        {errores.telefono && <p className='error'>{errores.telefono}</p>}
                        <input 
                            type='password' 
                            name="clave" 
                            placeholder='Contraseña'
                            value={usuario.clave}
                            onChange={handleInputChange}
                            
                        />
                        {errores.clave && <p className='error'>{errores.clave}</p>}
                        {/* <input 
                            type='password' 
                            name="rep-password" 
                            placeholder='Repetir contraseña'
                        /> */}
                        <button type='submit'>Registrarse</button>
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