import React from "react";
import Usuario from "./Usuario";

interface UsuarioType {
  id: number;
  nombre: string;
  edad: number;
}

interface ListaUsuariosProps {
  usuarios: UsuarioType[];
}

const ListaUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios }) => {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {usuarios.map(usuario => (
        <Usuario
          key={usuario.id}
          nombre={usuario.nombre}
          edad={usuario.edad}
        />
      ))}
    </div>
  );
};

export default ListaUsuarios;
