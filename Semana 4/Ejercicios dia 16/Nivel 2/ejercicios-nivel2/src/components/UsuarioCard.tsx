import React from "react";

interface Usuario {
  nombre: string;
  edad: number;
  activo: boolean;
}

interface UsuarioCardProps {
  usuario: Usuario;
}

const UsuarioCard: React.FC<UsuarioCardProps> = ({ usuario }) => {
  const { nombre, edad, activo } = usuario;

  const estiloFondo: React.CSSProperties = {
    backgroundColor: activo ? "green" : "red",
    color: activo ? "#155724" : "#721c24",
    padding: "1rem",
    borderRadius: "8px",
    maxWidth: "300px",
    margin: "1rem auto",
    textAlign: "center",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  };

  return (
    <div style={estiloFondo}>
      <h3>{nombre}</h3>
      <p>Edad: {edad}</p>
      <p>Estado: {activo ? "Activo" : "Inactivo"}</p>
    </div>
  );
};

export default UsuarioCard;
