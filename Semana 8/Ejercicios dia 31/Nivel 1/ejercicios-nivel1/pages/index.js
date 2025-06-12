import { useEffect, useState } from 'react';

export default function Home() {
  const [mensaje, setMensaje] = useState('');
  const [numero, setNumero] = useState(null);

  useEffect(() => {
    // Llamada a /api/saludo
    fetch('/api/saludo')
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje));

    // Llamada a /api/numero
    fetch('/api/numero')
      .then(res => res.json())
      .then(data => setNumero(data.numero));
  }, []);

  return (
    <div>
      <p><strong>Mensaje desde la API:</strong> {mensaje}</p>
      <p><strong>Número aleatorio:</strong> {numero}</p>
    </div>
  );
}
