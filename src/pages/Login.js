import React, { useState } from 'react';
import logo from "../assets/logos/logo-original.png";
import "../styles/Login.css"
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { valid } from 'semver';

function validaciones(email, setEmailError, password, setPassordError) {
    // Manejar validaciones del campo email
    if (email === '') {
        setEmailError('El campo no puede estar vacío');
    } else {
        setEmailError('');
    }

    // Manejar validaciones del campo contraseña
    if (password === '') {
        setPassordError('El campo no puede estar vacío');
    } else if (password.length < 4) {
        setPassordError('La contraseña debe tener al menos 4 caracteres');
    } else {
        setPassordError('');
    }
}

function Login() {

    const navigate = useNavigate();
    // const [userData, setUserData] = useState(null);
    const [usuario, setUsuario] = useState({
        email: '',
        password: '',
    });

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPassordError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    const iniciarSesion = async (event) => {
        event.preventDefault();

        //Validaciones de campos
        validaciones(usuario.email, setEmailError, usuario.password, setPassordError)

        //Si hay errores de validación, no se envía la solicitud
        if (emailError || passwordError) {
            return;
        }

        try {
          const response = await axios.post("http://localhost:3000/api/auth",usuario);
          console.log("Login exitoso: ", response.data.token);
    
          //Almacena los datos del usuario autenticado en el estado
        //   setUserData(response.data.token);
    
          //gurda en local storage
          localStorage.setItem("token", response.data.token);
    
          navigate("/home"); //Navega hacia el home
        } catch (error) {
            console.error("No se puede iniciar sesión: ", error);
            alert("No se puede iniciar sesión: ", error);
        }
    };

    return (
        <div>
            <main id="contenedor-login">
                <div className='contenedor-logo'>
                    <img src={logo} alt='Logo' className='logo-grande'></img>
                    <h1>Tu próximo laburo está a un click de distancia.</h1>
                </div>
                <form className='formulario-login' onSubmit={iniciarSesion}>
                    <h2>¡Bienvenido!</h2>
                    <div className='contenedor-inputs' >
                        <input 
                            type='text'
                            name="email" 
                            placeholder='Usuario / Correo electrónico'
                            value={usuario.email}
                            onChange={handleInputChange}
                            required
                        />
                        {emailError && <p className='error-input'>{emailError}</p>}
                        <input 
                            type='password' 
                            name="password" 
                            placeholder='Contraseña'
                            value={usuario.password}
                            onChange={handleInputChange}
                            required
                        />
                        {passwordError && <p className='error-input'>{passwordError}</p>}
                        <Link>¿Olvidaste tu contraseña?</Link>
                        <button className='boton-superior-aux' type='submit' onClick={iniciarSesion}>Iniciar sesión</button>
                        <div className='linea-horizontal'></div>
                    </div>
                    <div className='contenedor-links'>
                        <Link to="/registro">
                            ¿No tenés una cuenta? Registrate
                        </Link>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    );
};

export default Login;