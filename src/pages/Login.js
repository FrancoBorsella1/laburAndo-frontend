import React from 'react';
import logo from "../assets/logos/logo-original.png";
import "../styles/Login.css"
import Footer from '../components/Footer';

function Login() {
    return (
        <div>
            <main id="contenedor-login">
                <div className='contenedor-logo'>
                    <img src={logo} alt='Logo' className='logo-grande'></img>
                    <h1>Tu próximo laburo está a un click de distancia.</h1>
                </div>
                <form className='formulario-login'>
                    <h2>¡Bienvenido!</h2>
                    <div className='contenedor-inputs'>
                        <input type='text' name="email" placeholder='Correo electrónico'/>
                        <input type='password' name="password" placeholder='Contraseña'/>
                        <a href='#'>¿Olvidaste tu contraseña?</a>
                        <button>Iniciar sesión</button>
                        <div className='linea-horizontal'></div>
                    </div>
                    <div className='contenedor-links'>
                        <a href='#'>¿No tenés una cuenta? Registrate</a>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    );
};

export default Login;