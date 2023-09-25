import Detalles from "./components/Detalles";
import { useState } from "react";
import AltaPublicacion from "./components/AltaPublicacion";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <h1>Abrir modal</h1>
      <button onClick={() => setOpenModal(true)}>Abrir</button>
      {openModal && <Detalles
        closeModal={setOpenModal}
        titulo="Busco Plomero"
        descripcion="Busco cambiar un flotante de un inodoro que pierde agua"
        servicio="Plomeria"
        localidad="Berazategui"
        nombre="Franco Borsella"
        numero="12345678"
        fecha="27/07/2023"
      />}
    </>
  );
}

export default App;

/* 

Código dentro del return para los detalles de una publicación (Agregar a pantalla de Home cuando esté hehca)

    DETALLES
    <>
      <h1>Abrir modal</h1>
      <button onClick={() => setOpenModal(true)}>Abrir</button>
      {openModal && <Detalles
      closeModal={setOpenModal} />}
    </>

    ALTA PUBLICACION
    <>
      <h1>Abrir modal</h1>
      <button onClick={() => setOpenModal(true)}>Abrir</button>
      {openModal && <AltaPublicacion
      closeModal={setOpenModal} />}
    </>
*/
