import { useState } from "react";
//import Detalles from "./components/Detalles";
//import AltaPublicacion from "./components/AltaPublicacion";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home/>
    </>
  );
}

export default App;

/* 

Código dentro del return para los detalles de una publicación (Agregar a pantalla de Home cuando esté hehca)

    ALTA PUBLICACION
    <>
      <h1>Abrir modal</h1>
      <button onClick={() => setOpenModal(true)}>Abrir</button>
      {openModal && <AltaPublicacion
      closeModal={setOpenModal} />}
    </>
*/
