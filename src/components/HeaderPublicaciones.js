import React, { useState, useEffect } from "react";
import "../styles/Header.css";

function HeaderPublicaciones({ onAbrirModal }) {
  return (
    <header id="componente-header">
      <div className="contenedor-publicacion">
        <p>Publicá una oferta de laburo</p>
        <button className="publicacion" onClick={onAbrirModal}>
          Creá una publicación...
        </button>
      </div>
    </header>
  );
}

export default HeaderPublicaciones;
