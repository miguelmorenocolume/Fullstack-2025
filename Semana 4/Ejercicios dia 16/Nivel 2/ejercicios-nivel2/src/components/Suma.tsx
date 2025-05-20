import React from "react";

interface SumaProps {
  a: number;
  b: number;
}

function sumar(a: number, b: number): number {
  return a + b;
}

const Suma: React.FC<SumaProps> = ({ a, b }) => {
  const resultado = sumar(a, b);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Resultado de la suma:</h2>
      <p>
        {a} + {b} = {resultado}
      </p>
    </div>
  );
};

export default Suma;
