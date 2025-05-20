import React, { useState } from "react";

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

const ListaTareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: "Tarea 1", completada: false },
    { id: 2, texto: "Tarea 2", completada: true },
    { id: 3, texto: "Tarea 3", completada: false },
  ]);

  const toggleCompletada = (id: number) => {
    setTareas(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "Arial" }}>
      <h2>Lista de Tareas</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareas.map(({ id, texto, completada }) => (
          <li
            key={id}
            onClick={() => toggleCompletada(id)}
            style={{
              textDecoration: completada ? "line-through" : "none",
              cursor: "pointer",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            {texto}
          </li>
        ))}
      </ul>
      <small>Haz click en una tarea para marcar como completada</small>
    </div>
  );
};

export default ListaTareas;
