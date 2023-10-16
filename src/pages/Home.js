import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Publicacion from '../components/Publicacion';
import Detalles from "../components/Detalles";
import AltaPublicacion from "../components/AltaPublicacion";
import Footer from '../components/Footer';
import axios from 'axios';

function Home() {

    //Obtengo el token del usuario para poder hacer las peticiones
    const token = localStorage.getItem("token");
    const config = { //token con formato Json
      headers: { Authorization: `Bearer ${token}` } 
    };
    console.log(config.headers.Authorization)

    const [publicacionesRecuperadas, setPublicacionesRecuperadas] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/publicacion', config)
            .then((response) => {
                setPublicacionesRecuperadas(response.data.publicaciones);
            })
            .catch((error) => {
                console.error('Error al obtener datos: ', error);
            })
    }, []);

    console.log('publicaciones recuperadass: ', publicacionesRecuperadas);

    const [publicacionAmpliada, setPublicacionAmpliada] = useState(null);
    //Funcion para cerrar la publicacion grande
    const closeDetalles = () => {
        setPublicacionAmpliada(null);
    };

    //Manejar la ampliacion de la publicacion
    const ampliarPublicacion = (idProp) => {
        setPublicacionAmpliada(idProp);
    }
    //Manejar el estado del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload();
    };
 
    //Renderizar las publicaciones chicas y la grande si está ampliada
    return(
        <>
            <Navbar/>
            <Header onAbrirModal={openModal}/>
            <main id="contenedor-home">
                <div className="home-linea-resultados">
                    <div className="linea-horizontal"></div>
                    <p>Resultados</p>
                    <FontAwesomeIcon icon={faCaretDown}/>
                    <div className="linea-horizontal"></div>
                </div>
                <div className="home-publicaciones">
                        {publicacionesRecuperadas.map((publicacion) => (
                            <Publicacion
                                idProp={publicacion.id}
                                tituloProp={publicacion.titulo}
                                fechaProp={publicacion.fecha}
                                servicioProp={publicacion.servicio.nombre}
                                localidadProp={publicacion.localidad.nombre}
                                onAmpliar={ampliarPublicacion}
                            />
                        ))}

                        {publicacionAmpliada && (
                            <Detalles idProp={publicacionAmpliada} closeModal={closeDetalles}/>
                        )}
                </div>
                {isModalOpen && (
                    <AltaPublicacion closeModal={closeModal} />
                )}
            </main>
            <Footer/>
        </>
    );
};

export default Home;