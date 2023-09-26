import React, { useState } from "react";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Publicacion from '../components/Publicacion';
import Detalles from "../components/Detalles";
import AltaPublicacion from "../components/AltaPublicacion";
import Footer from '../components/Footer';

function Home() {

    const publicaciones =[
        {
            id: 1,
            titulo: 'Publicacion 1',
            fecha: '27/07/2023',
            descripcion: 'Busco plomero para arreglar el flotante de un inodoro roto',
            nombre: 'Franco Borsella',
            numero: '124115124',
            servicio: 'Plomeria',
            localidad: 'Berazategui'
        },
        {
            id: 2,
            titulo: 'Publicacion 2',
            fecha: '27/07/2023',
            servicio: 'Plomeria',
            localidad: 'Berazategui'
        },
        {
            id: 2,
            titulo: 'Publicacion 2',
            fecha: '27/07/2023',
            servicio: 'Plomeria',
            localidad: 'Berazategui'
        },
        {
            id: 2,
            titulo: 'Publicacion 2',
            fecha: '27/07/2023',
            servicio: 'Plomeria',
            localidad: 'Berazategui'
        },
        {
            id: 2,
            titulo: 'Publicacion 2',
            fecha: '27/07/2023',
            servicio: 'Plomeria',
            localidad: 'Berazategui'
        },
        {
            id: 2,
            titulo: 'Publicacion 2',
            fecha: '27/07/2023',
            servicio: 'Plomeria',
            localidad: 'Berazategui'
        },

    ];

    const [publicacionAmpliada, setPublicacionAmpliada] = useState(null);
    //Funcion para cerrar la publicacion grande
    const closeDetalles = () => {
        setPublicacionAmpliada(null);
    };
    //Manejar la ampliacion de la publicacion
    const ampliarPublicacion = (publicacion) => {
        setPublicacionAmpliada(publicacion);
    }
    //Manejar el estado del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                    {publicaciones.map((publicacion) => (
                        <Publicacion
                            key={publicacion.id}
                            publicacion={publicacion}
                            onAmpliar={ampliarPublicacion}
                        />
                    ))}
                    {publicacionAmpliada && (
                        <Detalles publicacion={publicacionAmpliada} closeModal={closeDetalles}/>
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