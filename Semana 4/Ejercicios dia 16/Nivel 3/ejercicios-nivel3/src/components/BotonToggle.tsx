import React from "react";
import useToggle from "./useToggle";

const BotonToggle: React.FC = () => {
  const [activo, toggleActivo] = useToggle(false);

  return (
    <button onClick={toggleActivo}>
      {activo ? "Activado" : "Desactivado"}
    </button>
  );
};

export default BotonToggle;
