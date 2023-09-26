import React from "react";
import '../styles/Header.css';

function Header({onAbrirModal}) {
    return(
        <header id="componente-header">
            <div className="contenedor-publicacion">
                <p>¿Estás buscando un servicio?</p>
                <button className="publicacion" onClick={onAbrirModal}>Creá una publicación...</button>
            </div>
            <div className="linea-vertical"></div>
            <div className="contenedor-busqueda">
                <p>¿Estás buscando un trabajo?</p>
                <form className="formulario-busqueda">
                    <select name="Servicio">
                        <option value="" disabled selected hidden>Servicio</option>
                        <option value="plomeria">Plomería</option>
                        <option value="electricidad">Electricidad</option>
                        <option value="jardineria">Jardinería</option>
                    </select>
                    <select name="Localidad">
                        <option value="" disabled selected hidden>Localidad</option>
                        <option value="berazategui">Berazategui</option>
                        <option value="berisso">Berisso</option>
                        <option value="la plata">La Plata</option>
                    </select>
                    <button>Buscar</button>
                </form>
            </div>
        </header>
    );
};

export default Header;