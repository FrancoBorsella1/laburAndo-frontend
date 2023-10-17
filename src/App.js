import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import PerfilVisitado from "./pages/PerfilVisitado";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/registro" element={<Register/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/perfil" element={<Perfil/>} />
      <Route path="/perfilvisitado" element={<PerfilVisitado/>}/>
    </Routes>
  );
}

export default App;