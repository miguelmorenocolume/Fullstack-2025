import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMensaje(res.data.mensaje);
      } catch (err) {
        setMensaje('Acceso denegado al panel de administrador');
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Zona de Administrador</h2>
      <p>{mensaje}</p>
    </div>
  );
}
