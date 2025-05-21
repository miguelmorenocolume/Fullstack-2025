import React, { useRef } from 'react';

const InputFocus = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="p-4 space-y-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe algo..."
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleFocus}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Enfocar campo de texto
      </button>
    </div>
  );
};

export default InputFocus;