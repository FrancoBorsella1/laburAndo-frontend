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
                            required
                        />
                        <input 
                            type='text' 
                            name="apellido" 
                            placeholder='Apellido'
                            value={usuario.apellido}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type='text' 
                            name="email" 
                            placeholder='Correo electrónico'
                            value={usuario.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type='text' 
                            name="usuario" 
                            placeholder='Nombre de usuario'
                            value={usuario.usuario}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type='text' 
                            name="telefono" 
                            placeholder='Telefono'
                            value={usuario.telefono}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type='password' 
                            name="clave" 
                            placeholder='Contraseña'
                            value={usuario.clave}
                            onChange={handleInputChange}
                            required
                        />
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