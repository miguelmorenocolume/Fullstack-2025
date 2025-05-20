import React, { useState } from "react";

const FormularioNombre: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Hola, ${nombre}!`);
    setNombre("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "2rem" }}>
      <label htmlFor="nombre">Ingresa tu nombre:</label>
      <br />
      <input
        id="nombre"
        type="text"
        value={nombre}
        onChange={handleChange}
        placeholder="Tu nombre"
      />
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioNombre;
