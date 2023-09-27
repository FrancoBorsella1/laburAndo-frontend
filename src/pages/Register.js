import React from 'react';
import logo from "../assets/logos/logo-original.png";
import "../styles/Register.css"
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div>
            <main id="contenedor-registro">
                <div className='contenedor-logo'>
                    <img src={logo} alt='Logo' className='logo-grande'></img>
                    <h1>Tu próximo laburo está a un click de distancia.</h1>
                </div>

                <form className='formulario-registro'>
                    <h2>Registro</h2>
                    <div className='contenedor-inputs'>
                        <input type='text' name="nombre" placeholder='Nombre'/>
                        <input type='text' name="apellido" placeholder='Apellido'/>
                        <input type='text' name="telefono" placeholder='Telefono'/>
                        <input type='text' name="email" placeholder='Correo electrónico'/>
                        <input type='password' name="password" placeholder='Contraseña'/>
                        <input type='password' name="rep-password" placeholder='Repetir contraseña'/>
                        <button>Registrarse</button>
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