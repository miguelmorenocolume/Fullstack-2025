import React, { useState, useRef, useEffect } from 'react';

const ChatVivo = () => {
  const [mensajes, setMensajes] = useState([
    'Bienvenido al chat.',
  ]);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  const enviarMensaje = () => {
    const texto = inputRef.current.value.trim();
    if (!texto) return;

    setMensajes(prev => [...prev, texto]);
    inputRef.current.value = '';
  };

  useEffect(() => {
    const chat = chatRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col h-[400px] border rounded shadow bg-white">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-2 space-y-2 border rounded mb-4 bg-gray-50"
      >
        {mensajes.map((msg, i) => (
          <div
            key={i}
            className="bg-blue-100 p-2 rounded shadow-sm max-w-[80%]"
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Escribe tu mensaje..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={e => {
            if (e.key === 'Enter') enviarMensaje();
          }}
        />
        <button
          onClick={enviarMensaje}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatVivo;
