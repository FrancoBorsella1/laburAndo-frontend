import React, { useState } from 'react';
import logo from "../assets/logos/logo-original.png";
import "../styles/Login.css"
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [usuario, setUsuario] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    const iniciarSesion = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/auth', usuario);
            console.log('Login exitoso: ', response.data); 
            
            //Almacena los datos del usuario autenticado en el estado
            setUserData(response.data);
            
            navigate("/home"); //Navega hacia el home
        } catch (error) {
            console.error('No se puede iniciar sesión: ', error);
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
                            placeholder='Correo electrónico'
                            value={usuario.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type='password' 
                            name="password" 
                            placeholder='Contraseña'
                            value={usuario.password}
                            onChange={handleInputChange}
                            required
                        />
                        <Link>¿Olvidaste tu contraseña?</Link>
                        <button type='submit' onClick={iniciarSesion}>Iniciar sesión</button>
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