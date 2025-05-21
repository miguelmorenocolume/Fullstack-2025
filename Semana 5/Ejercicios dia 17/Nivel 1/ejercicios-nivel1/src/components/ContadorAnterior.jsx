import React, { useState, useRef, useEffect } from 'react';

const ContadorAnterior = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(null);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Contador actual: {count}</h1>
      <h2 className="text-gray-600">
        Contador anterior: {prevCountRef.current !== null ? prevCountRef.current : 'N/A'}
      </h2>
      <button
        onClick={handleIncrement}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Incrementar
      </button>
    </div>
  );
};

export default ContadorAnterior;
