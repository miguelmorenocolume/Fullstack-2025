import { useRef } from 'react';

const ContenedorScroll = () => {
  const contenedorRef = useRef(null);

  const irAlFinal = () => {
    const contenedor = contenedorRef.current;
    if (contenedor) {
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <button
        onClick={irAlFinal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ir al final
      </button>

      <div
        ref={contenedorRef}
        className="h-64 overflow-y-auto border rounded p-2 space-y-2 bg-gray-50"
      >
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="p-2 bg-white shadow rounded">
            Elemento #{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContenedorScroll;
