import Detalles from "./components/Detalles";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <h1>Abrir modal</h1>
      <button onClick={() => setOpenModal(true)}>Abrir</button>
      {openModal && <Detalles closeModal={setOpenModal} />}
    </>
  );
}

export default App;
