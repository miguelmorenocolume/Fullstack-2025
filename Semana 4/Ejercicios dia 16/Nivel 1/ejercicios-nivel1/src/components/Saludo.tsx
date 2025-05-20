import React, { useState } from "react";


interface SaludoProps {
  nombre: string;
}

const Saludo: React.FC<SaludoProps> = ({ nombre }) => {
  const [contador, setContador] = useState<number>(0);

  const incrementar = () => setContador(contador + 1);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Hola, {nombre}</h1>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={incrementar}>Aumentar contador</button>
    </div>
  );
};

export default Saludo;
