import React, { useState } from "react";

interface UsuarioProps {
  nombre: string;
  edad: number;
}

const Usuario: React.FC<UsuarioProps> = ({ nombre, edad }) => {
  const [activo, setActivo] = useState<boolean>(false);

  const toggleActivo = () => setActivo(prev => !prev);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>{nombre}</h3>
      <p>Edad: {edad}</p>
      <button onClick={toggleActivo}>
        {activo ? "Activo" : "Inactivo"}
      </button>
    </div>
  );
};

export default Usuario;
