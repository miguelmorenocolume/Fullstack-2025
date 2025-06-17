import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Protegido() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchProtegido = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:4000/api/protegido', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMensaje(res.data.mensaje);
    };

    fetchProtegido().catch(() => setMensaje('Error al acceder'));
  }, []);

  return (
    <div>
      <h2>Ruta Protegida</h2>
      <p>{mensaje}</p>
    </div>
  );
}
