import React, { useState, useRef, useEffect } from 'react';

const RenderContador = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(1); 

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Contador: {count}</h1>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Incrementar
      </button>
      <p className="text-gray-600">Número de renders: {renderCount.current}</p>
    </div>
  );
};

export default RenderContador;
